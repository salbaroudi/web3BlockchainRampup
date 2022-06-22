pragma solidity ^0.6.0;

import "./Ownable.sol";
import "./Item.sol";

//In our original smart contract, Item Manager also contained payment functionality. We will separate payment to another smart contract.
//by being Ownable, only the contract launcher
contract ItemManager is Ownable { //when an instance of this is created, it has an address. It is outputted by the createItem() function below (via emit)
    enum SupplyChainState{Created, Paid, Delivered}

    struct S_Item {
        Item _item;
        string _identifier;
        ItemManager.SupplyChainState _step;
    }

    mapping(uint => S_Item) public items;
    uint index;

    //We fire this everytime we reach a new step, for a particular item.
    event SupplyChainStep(uint _itemIndex, uint _step, address _address);


    //Note that the range of our mapping is initialized wiht empty S_Items.
    //This function initializes a record - gen ID before you call it.
    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner {
        Item item = new Item(this, _itemPrice, index); //An address must have been created by EVM, as we instantiate the Smart Contract Item.
        items[index]._item = item;
        items[index]._identifier = _identifier;
        items[index]._step = SupplyChainState.Created;
        emit SupplyChainStep(index, uint(items[index]._step), address(item)); //We output our address.
        index++;
    }


    function triggerPayment(uint _index) public payable {
        //Checks and Balances. Notice that payment is sent from an account, so we need a payable keyword.
        Item item = items[_index]._item;
        require(address(item) == msg.sender, "Not the owner");
        //Notice that priceInWei is accessed with a getter, not a direct property (external contract).
        require(item.priceInWei() == msg.value, "No Short-Changing Permitted.");
        require(items[_index]._step == SupplyChainState.Created, "Item has already dispatched. Select another item.");
        items[_index]._step = SupplyChainState.Paid;
        emit SupplyChainStep(_index, uint(items[_index]._step), address(item));
    }

    function triggerDelivery(uint _index) public onlyOwner {
        require(items[_index]._step == SupplyChainState.Paid, "Item has already been dispatched.");
        items[_index]._step = SupplyChainState.Delivered;

        emit SupplyChainStep(_index, uint(items[_index]._step),address(items[_index]._item));

    }
}
