#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class [[eosio::contract]] cfcontract : public eosio::contract {

public:
  using contract::contract;
  
  cfcontract(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void upsert(name user, std::string first_name, std::string last_name, asset bal) {
    //require_auth( user );
    address_index addresses(_code, _code.value);
    auto iterator = addresses.find(user.value);
    if( iterator == addresses.end() )
    {
      addresses.emplace(user, [&]( auto& row ) {
       row.key = user;
       row.first_name = first_name;
       row.last_name = last_name;
       row.balance = bal;
      });
    }
    else {
      std::string changes;
      addresses.modify(iterator, user, [&]( auto& row ) {
        row.key = user;
        row.first_name = first_name;
        row.last_name = last_name;
        row.balance = bal;
      });
    }
  }




  [[eosio::action]]
  void transfer(name from, name to, asset quantity){
    
    eosio_assert( is_account( from ), "transfer: to account does not exist");
    eosio_assert( is_account( to ), "transfer: to account does not exist");
    eosio_assert( from != to, "transfer: cannot transfer to self" );
    eosio_assert( quantity.amount > 0, "transfer: must transfer positive quantity" );
    eosio_assert( from.value > 0, "transfer: must transfer positive quantity" );

    address_index addresses(_code, _code.value);
    auto account = addresses.find(to.value);
    eosio_assert( account != addresses.end(), "transfer: user does not exist" );

    addresses.modify(account, to, [&]( auto& row ) {
        row.balance = (row.balance + quantity);
       
      });


    auto account2 = addresses.find(from.value);
    eosio_assert( account2 != addresses.end(), "transfer: transfer: user does not exist" );

    addresses.modify(account2, from, [&]( auto& row ) {
        row.balance = (row.balance - quantity);
       
      });

  }


  [[eosio::action]]
  void deposit(name username, asset quantity){
    
    address_index addresses(_code, _code.value);
    auto account = addresses.find(username.value);
    eosio_assert( account != addresses.end(), "depo: user does not exist" );
    eosio_assert( quantity.amount > 0, "depo: must transfer positive quantity" );


    addresses.modify(account, username, [&]( auto& row ) {
        row.balance = (row.balance + quantity);
      });

  }

  [[eosio::action]]
  void withdraw(name username, asset quantity){
    
    address_index addresses(_code, _code.value);
    auto account = addresses.find(username.value);
    eosio_assert( account != addresses.end(), "withdraw: user does not exist" );
    eosio_assert( account->balance.amount > quantity.amount, "withdraw: insufficient balance" );


    addresses.modify(account, username, [&]( auto& row ) {
        row.balance = (row.balance - quantity);
      });

  }

  [[eosio::action]]
  void getbalance(name user ){
      eosio_assert( is_account( user ), "depo: to account does not exist");

      address_index addresses(_code, _code.value);
      auto account = addresses.find(user.value);
      eosio_assert( account != addresses.end(), "depo: user does not exist" );
      printi(account->balance.amount);

      /*eosio::token t(N(eosio.token));
      const auto sym_name = eosio::symbol_type(S(4,EOS)).name();
      const auto my_balance = t.get_balance(N(user), sym_name );
      eosio::print("My balance is ", my_balance);*/ 

  }

  [[eosio::action]]
  void draw(){
      uint64_t r = rand();

  }


  [[eosio::action]]
  void erase(name user) {
    require_auth(user);

    address_index addresses(_self, _code.value);

    auto iterator = addresses.find(user.value);
    eosio_assert(iterator != addresses.end(), "erase: Record does not exist");
    addresses.erase(iterator);
  }

private:
  struct [[eosio::table]] person {
    name key;
    std::string first_name;
    std::string last_name;
    asset balance;

    uint64_t primary_key() const { return key.value; }
  };
  typedef eosio::multi_index<"people"_n, person> address_index;

};

EOSIO_DISPATCH( cfcontract, (upsert)(transfer)(deposit)(withdraw)(getbalance)(erase))

      
    
    