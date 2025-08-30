// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title YieldAggregator
 * @dev Smart contract for yield farming aggregation
 * Automatically allocates funds to the highest-yielding pools
 */
contract YieldAggregator is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    // Structs
    struct Pool {
        string protocol;
        string poolName;
        address poolAddress;
        uint256 apy;
        uint256 tvl;
        uint256 riskLevel; // 1=Low, 2=Medium, 3=High
        bool isActive;
        uint256 lastUpdate;
    }

    struct UserDeposit {
        uint256 amount;
        uint256 timestamp;
        uint256 poolId;
        bool isActive;
    }

    struct ProtocolData {
        string name;
        uint256 totalApy;
        uint256 totalTvl;
        uint256 poolCount;
        bool isActive;
    }

    // State variables
    mapping(uint256 => Pool) public pools;
    mapping(address => UserDeposit[]) public userDeposits;
    mapping(string => ProtocolData) public protocols;
    
    uint256 public poolCount;
    uint256 public totalTvl;
    uint256 public totalUsers;
    
    IERC20 public stablecoin; // USDC, USDT, DAI, etc.
    
    // Events
    event PoolAdded(uint256 indexed poolId, string protocol, string poolName, uint256 apy);
    event PoolUpdated(uint256 indexed poolId, uint256 newApy, uint256 newTvl);
    event UserDeposited(address indexed user, uint256 amount, uint256 poolId);
    event UserWithdrawn(address indexed user, uint256 amount, uint256 poolId);
    event FundsReallocated(uint256 fromPoolId, uint256 toPoolId, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);

    // Modifiers
    modifier onlyActivePool(uint256 _poolId) {
        require(pools[_poolId].isActive, "Pool is not active");
        _;
    }

    modifier validAmount(uint256 _amount) {
        require(_amount > 0, "Amount must be greater than 0");
        _;
    }

    constructor(address _stablecoin) {
        stablecoin = IERC20(_stablecoin);
        poolCount = 0;
        totalTvl = 0;
        totalUsers = 0;
    }

    /**
     * @dev Add a new yield farming pool
     */
    function addPool(
        string memory _protocol,
        string memory _poolName,
        address _poolAddress,
        uint256 _apy,
        uint256 _tvl,
        uint256 _riskLevel
    ) external onlyOwner {
        require(_riskLevel >= 1 && _riskLevel <= 3, "Invalid risk level");
        
        poolCount = poolCount.add(1);
        uint256 poolId = poolCount;
        
        pools[poolId] = Pool({
            protocol: _protocol,
            poolName: _poolName,
            poolAddress: _poolAddress,
            apy: _apy,
            tvl: _tvl,
            riskLevel: _riskLevel,
            isActive: true,
            lastUpdate: block.timestamp
        });

        // Update protocol data
        if (protocols[_protocol].isActive) {
            protocols[_protocol].totalApy = protocols[_protocol].totalApy.add(_apy);
            protocols[_protocol].totalTvl = protocols[_protocol].totalTvl.add(_tvl);
            protocols[_protocol].poolCount = protocols[_protocol].poolCount.add(1);
        } else {
            protocols[_protocol] = ProtocolData({
                name: _protocol,
                totalApy: _apy,
                totalTvl: _tvl,
                poolCount: 1,
                isActive: true
            });
        }

        totalTvl = totalTvl.add(_tvl);
        
        emit PoolAdded(poolId, _protocol, _poolName, _apy);
    }

    /**
     * @dev Update pool APY and TVL (called by oracle/API)
     */
    function updatePoolData(
        uint256 _poolId,
        uint256 _newApy,
        uint256 _newTvl
    ) external onlyOwner onlyActivePool(_poolId) {
        Pool storage pool = pools[_poolId];
        
        // Update protocol totals
        protocols[pool.protocol].totalApy = protocols[pool.protocol].totalApy.sub(pool.apy).add(_newApy);
        protocols[pool.protocol].totalTvl = protocols[pool.protocol].totalTvl.sub(pool.tvl).add(_newTvl);
        
        // Update total TVL
        totalTvl = totalTvl.sub(pool.tvl).add(_newTvl);
        
        // Update pool data
        pool.apy = _newApy;
        pool.tvl = _newTvl;
        pool.lastUpdate = block.timestamp;
        
        emit PoolUpdated(_poolId, _newApy, _newTvl);
    }

    /**
     * @dev Deposit stablecoins into the aggregator
     */
    function deposit(uint256 _amount) external nonReentrant validAmount(_amount) {
        require(
            stablecoin.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        // Find the highest-yielding pool
        uint256 bestPoolId = findBestPool();
        require(bestPoolId > 0, "No active pools available");

        // Record user deposit
        if (userDeposits[msg.sender].length == 0) {
            totalUsers = totalUsers.add(1);
        }

        userDeposits[msg.sender].push(UserDeposit({
            amount: _amount,
            timestamp: block.timestamp,
            poolId: bestPoolId,
            isActive: true
        }));

        emit UserDeposited(msg.sender, _amount, bestPoolId);
    }

    /**
     * @dev Withdraw user deposits
     */
    function withdraw(uint256 _depositIndex) external nonReentrant {
        require(_depositIndex < userDeposits[msg.sender].length, "Invalid deposit index");
        
        UserDeposit storage deposit = userDeposits[msg.sender][_depositIndex];
        require(deposit.isActive, "Deposit already withdrawn");
        require(deposit.timestamp.add(1 days) <= block.timestamp, "Minimum lock period not met");

        uint256 amount = deposit.amount;
        deposit.isActive = false;

        require(
            stablecoin.transfer(msg.sender, amount),
            "Withdrawal failed"
        );

        emit UserWithdrawn(msg.sender, amount, deposit.poolId);
    }

    /**
     * @dev Find the pool with the highest APY
     */
    function findBestPool() public view returns (uint256) {
        uint256 bestApy = 0;
        uint256 bestPoolId = 0;

        for (uint256 i = 1; i <= poolCount; i++) {
            if (pools[i].isActive && pools[i].apy > bestApy) {
                bestApy = pools[i].apy;
                bestPoolId = i;
            }
        }

        return bestPoolId;
    }

    /**
     * @dev Get all active pools
     */
    function getActivePools() external view returns (Pool[] memory) {
        Pool[] memory activePools = new Pool[](poolCount);
        uint256 activeCount = 0;

        for (uint256 i = 1; i <= poolCount; i++) {
            if (pools[i].isActive) {
                activePools[activeCount] = pools[i];
                activeCount = activeCount.add(1);
            }
        }

        // Resize array to actual active count
        assembly {
            mstore(activePools, activeCount)
        }

        return activePools;
    }

    /**
     * @dev Get user deposits
     */
    function getUserDeposits(address _user) external view returns (UserDeposit[] memory) {
        return userDeposits[_user];
    }

    /**
     * @dev Get protocol statistics
     */
    function getProtocolStats(string memory _protocol) external view returns (ProtocolData memory) {
        return protocols[_protocol];
    }

    /**
     * @dev Emergency withdrawal for users
     */
    function emergencyWithdraw() external nonReentrant {
        uint256 totalAmount = 0;

        for (uint256 i = 0; i < userDeposits[msg.sender].length; i++) {
            if (userDeposits[msg.sender][i].isActive) {
                totalAmount = totalAmount.add(userDeposits[msg.sender][i].amount);
                userDeposits[msg.sender][i].isActive = false;
            }
        }

        require(totalAmount > 0, "No active deposits");
        require(
            stablecoin.transfer(msg.sender, totalAmount),
            "Emergency withdrawal failed"
        );

        emit EmergencyWithdraw(msg.sender, totalAmount);
    }

    /**
     * @dev Pause/unpause a pool
     */
    function togglePool(uint256 _poolId) external onlyOwner {
        require(_poolId > 0 && _poolId <= poolCount, "Invalid pool ID");
        pools[_poolId].isActive = !pools[_poolId].isActive;
    }

    /**
     * @dev Get contract statistics
     */
    function getContractStats() external view returns (
        uint256 _totalTvl,
        uint256 _totalUsers,
        uint256 _poolCount,
        uint256 _totalDeposits
    ) {
        uint256 totalDeposits = 0;
        for (uint256 i = 1; i <= poolCount; i++) {
            if (pools[i].isActive) {
                totalDeposits = totalDeposits.add(pools[i].tvl);
            }
        }

        return (totalTvl, totalUsers, poolCount, totalDeposits);
    }
}
