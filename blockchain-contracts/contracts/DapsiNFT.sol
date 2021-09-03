// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@0xcert/ethereum-erc721-contracts/src/contracts/nf-token-metadata-enumerable.sol";
import "./helpers/Ownable.sol";

contract DapsiNFT is
  NFTokenMetadataEnumerable,
  Ownable
{

  /**
   * @dev Contract constructor.
   * @param _name A descriptive name for a collection of NFTs.
   * @param _symbol An abbreviated name for NFTokens.
   * @param _uriPrefix Prefix of URI for token metadata URIs.
   * @param _uriPostfix Postfix of URI for token metadata URIs.
   */
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _uriPrefix,
    string memory _uriPostfix
  )
  {
    nftName = _name;
    nftSymbol = _symbol;
    uriPrefix = _uriPrefix;
    uriPostfix = _uriPostfix;
  }

  /**
   * @dev Mapping of token hashes.
   */
  mapping (uint256 => string) public idToHash;

  /**
   * @dev Mapping of addresses that are authorized to add mint new tokens.
   */
  mapping (address => bool) public authorizedAddresses;

  /**
   * @dev Only authorized addresses can call a function with this modifier.
   */
  modifier onlyAuthorized() {
    require(authorizedAddresses[msg.sender] || owner() == msg.sender, "Not authorized");
    _;
  }

  /**
   * @dev Sets or revokes authorized address.
   * @param addr Address we are setting.
   * @param isAuthorized True is setting, false if we are revoking.
   */
  function setAuthorizedAddress(address addr, bool isAuthorized)
    external
    onlyOwner()
  {
    authorizedAddresses[addr] = isAuthorized;
  }

 /**
   * @dev Creates a new NFT.
   * @param _to The address that will own the created NFT.
   * @param _tokenId of the NFT to be created by the msg.sender.
   * @param _hash String representing data hash of the token.
   */
  function create(
    address _to,
    uint256 _tokenId,
    string calldata _hash
  )
    external
    onlyAuthorized
  {
    idToHash[_tokenId] = _hash;
    super._create(_to, _tokenId);
  }
  
  /**
   * @dev Change URI.
   * @param _uriPrefix New uriPrefix.
   * @param _uriPostfix New uriPostfix.
   */
  function setUri(
    string calldata _uriPrefix,
    string calldata _uriPostfix
  )
    external
    onlyOwner
  {
    super._setUri(_uriPrefix, _uriPostfix);
  }

}