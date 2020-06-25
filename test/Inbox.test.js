const assert=require('assert');
const ganache=require('ganache-cli');

const Web3=require('web3');//capital Web3 bcz later will create instrace web3
const provider=ganache.provider()
const web3=new Web3(provider);
const { interface,bytecode}=require('../compile');

let accounts;
let inbox;


beforeEach(async ()=>{
accounts=await web3.eth.getAccounts();
//console.log(accounts);
inbox=await new  web3.eth.Contract(JSON.parse(interface))
.deploy({data:bytecode,arguments:['Hi there!']})
.send({from:accounts[0],gas:'1000000'})

inbox.setProvider(provider);
});




describe('Inbox',()=>{
  it('deploys the contract',()=>{
  //console.log(inbox);
  assert.ok(inbox.options.address);
  });

  it('It has a default message',async ()=>{
  const message=await inbox.methods.message().call();
  assert.equal(message,'Hi there!')
  });

 it('can change message',async ()=>{
    await inbox.methods.setMessage('Hai').send({from:accounts[0]});
    const message=await inbox.methods.message().call();
    assert.equal(message,'Hai');

 });



});



























/*let car;
//writing test cases(important)
beforeEach(()=>{car=new Car();});

class Car{
  park(){
    return 'stopped';
  }
  drive(){
    return 'vroom';
  }
  good(){
    return 'best';
  }
}

describe('Car',()=>{
  it('can park',()=>{
    //const car=new Car();
    assert.equal(car.park(),'stopped');
  });
  it('can drive',()=>{
    //const car1=new Car();
    assert.equal(car.drive(),'vroom');
  });
  it('car has good method',()=>{
    assert.equal(car.good(),'best');
  });
});*/
