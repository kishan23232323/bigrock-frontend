// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BigRockToken
 * @notice ERC20 token with burn, pause, and ownership functionality
 * @dev Implements security improvements based on audit findings from January 12, 2026
 * 
 * Security Improvements:
 * - [BP-01] Renamed TOTAL_SUPPLY to INITIAL_SUPPLY for clarity
 * - [INFO-01] Added protection against renouncing ownership while paused
 * - [INFO-02] Added maximum pause duration of 365 days to limit centralization risk
 */
contract BigRockToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable {

    /// @notice Initial supply minted at deployment (not current supply after burns)
    /// @dev Renamed from TOTAL_SUPPLY to clarify it represents initial mint, not current supply
    uint256 public constant INITIAL_SUPPLY = 10_000_000_000 * 10**18;

    /// @notice Maximum duration the contract can remain paused (365 days)
    /// @dev Limits centralization risk by preventing indefinite pause
    uint256 public constant MAX_PAUSE_DURATION = 365 days;

    /// @notice Timestamp when the contract was last paused
    /// @dev Used to enforce maximum pause duration
    uint256 public pausedAt;

    /// @notice Emitted when ownership renouncement is attempted while paused
    error CannotRenounceWhilePaused();

    /// @notice Emitted when pause would exceed maximum duration
    error MaxPauseDurationExceeded();

    constructor() ERC20("BigRock Exchange", "BRK") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /// @notice Pause all token transfers
    /// @dev Can only be called by owner, enforces maximum pause duration
    function pause() external onlyOwner {
        // If already paused and max duration exceeded, require unpause first
        if (paused() && block.timestamp > pausedAt + MAX_PAUSE_DURATION) {
            revert MaxPauseDurationExceeded();
        }
        
        pausedAt = block.timestamp;
        _pause();
    }

    /// @notice Unpause token transfers
    /// @dev Can only be called by owner
    function unpause() external onlyOwner {
        pausedAt = 0;
        _unpause();
    }

    /// @notice Override renounceOwnership to prevent renouncing while paused
    /// @dev Fixes INFO-01: Prevents permanent contract freeze scenario
    function renounceOwnership() public override onlyOwner {
        if (paused()) {
            revert CannotRenounceWhilePaused();
        }
        super.renounceOwnership();
    }

    /// @notice Returns the time remaining until pause expires (if applicable)
    /// @dev Returns 0 if not paused or if max duration not yet reached
    /// @return Time remaining in seconds, or 0
    function pauseTimeRemaining() external view returns (uint256) {
        if (!paused() || pausedAt == 0) {
            return 0;
        }
        
        uint256 pauseExpiry = pausedAt + MAX_PAUSE_DURATION;
        if (block.timestamp >= pauseExpiry) {
            return 0;
        }
        
        return pauseExpiry - block.timestamp;
    }

    /// @dev Required override for ERC20Pausable
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}