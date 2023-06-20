const { Provider, Contract, Account, ec, json } = require("starknet");
//initialize Provider
const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });
const fs = require('fs');

let data = JSON.parse(fs.readFileSync('wallet.json'));
// load wallet
let privateKey0 = data.privateKey;
let account0Address = data.walletAddress;

const starkKeyPair0 = ec.getKeyPair(privateKey0);
const account0 = new Account(provider, account0Address, starkKeyPair0);

const abi = [
    {
        "name": "constructor",
        "type": "function",
        "inputs": [
            {
                "name": "name",
                "type": "core::felt252"
            },
            {
                "name": "symbol",
                "type": "core::felt252"
            },
            {
                "name": "claimAddress",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "name": "name",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::felt252"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "symbol",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::felt252"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "decimals",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u8"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "totalSupply",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u256"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "balanceOf",
        "type": "function",
        "inputs": [
            {
                "name": "account",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ],
        "outputs": [
            {
                "type": "core::integer::u256"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "allowance",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "spender",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ],
        "outputs": [
            {
                "type": "core::integer::u256"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "start_time",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u64"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "mint_count",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u64"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "mint_candidates_count",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u64"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "is_mint_candidate",
        "type": "function",
        "inputs": [
            {
                "name": "candidate",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ],
        "outputs": [
            {
                "type": "core::bool"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "available_mint_count",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u64"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "block_time",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u64"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "max_supply",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u256"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "block_halve_interval",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u64"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "block_reward",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "type": "core::integer::u256"
            }
        ],
        "state_mutability": "view"
    },
    {
        "name": "transfer",
        "type": "function",
        "inputs": [
            {
                "name": "recipient",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "amount",
                "type": "core::integer::u256"
            }
        ],
        "outputs": [
            {
                "type": "core::bool"
            }
        ],
        "state_mutability": "external"
    },
    {
        "name": "transferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "sender",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "recipient",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "amount",
                "type": "core::integer::u256"
            }
        ],
        "outputs": [
            {
                "type": "core::bool"
            }
        ],
        "state_mutability": "external"
    },
    {
        "name": "approve",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "amount",
                "type": "core::integer::u256"
            }
        ],
        "outputs": [
            {
                "type": "core::bool"
            }
        ],
        "state_mutability": "external"
    },
    {
        "name": "increase_allowance",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "added_value",
                "type": "core::integer::u256"
            }
        ],
        "outputs": [
            {
                "type": "core::bool"
            }
        ],
        "state_mutability": "external"
    },
    {
        "name": "decrease_allowance",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "subtracted_value",
                "type": "core::integer::u256"
            }
        ],
        "outputs": [
            {
                "type": "core::bool"
            }
        ],
        "state_mutability": "external"
    },
    {
        "name": "apply_mint",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "name": "Transfer",
        "type": "event",
        "inputs": [
            {
                "name": "from",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "to",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "value",
                "type": "core::integer::u256"
            }
        ]
    },
    {
        "name": "Approval",
        "type": "event",
        "inputs": [
            {
                "name": "owner",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "spender",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "value",
                "type": "core::integer::u256"
            }
        ]
    },
    {
        "name": "Apply",
        "type": "event",
        "inputs": [
            {
                "name": "candidate",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "mint_flag",
                "type": "core::integer::u64"
            }
        ]
    }
];
// Connect the deployed contract
const address = "0x06182278e63816ff4080ed07d668f991df6773fd13db0ea10971096033411b11";

// read abi of contract
// provider.getClassAt(address).then(res => {
    // if (res.abi === undefined) {
    //     throw new Error("no abi.")
    // }
    const myContract = new Contract(abi, address, provider);
    // Connect account with the contract
    myContract.connect(account0);
// })

let mintFail = 0;
let mintSuccess = 0;
function interact() {
    // 循环调用合约
    while (true) {
        try {
            let res = myContract.invoke("apply_mint");
            provider.waitForTransaction(res.transaction_hash);
            console.log("apply_mint失败/成功: ", mintFail, "/", ++mintSuccess);
        } catch (e) {
            console.log("apply_mint失败/成功: ", ++mintFail, "/", mintSuccess);
        }
    }
}

interact();