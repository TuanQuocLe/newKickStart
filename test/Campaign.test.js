const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')
const { compileFunction } = require('vm')

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({
            from: accounts[0],
            gas: '1000000'
        })
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)
    
})

describe('Campaigns', () => {
    it('deploy the factory contract', () => {
        assert.ok(factory.options.address)
        assert.ok(campaign.options.address)
    })

    it('marking caller as the manager campaign', async () => {
        const manager = await campaign.methods.manager().call()
        assert.equal(manager, accounts[0])
    })

    it('allowing people contribute and marking them as a contributor', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: '200'
        })

        const isContributor = await campaign.methods.approvers(accounts[0]).call()

        assert(isContributor)

    })

    it('require a minimum contribution', async ()=> {
    try {
        campaign.methods.contribute().send({
            from:accounts[1],
            value: '200'
        })
        assert(false)
        } catch (error) {
        assert(error)
        }
    }) 

    

    it('allowing manager finalize the request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        })
        await campaign.methods.createRequest('buying chrismas gifts', web3.utils.toWei('9', 'ether'), accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        })

        await campaign.methods.aprroveRequest(0).send({from: accounts[0], gas: '1000000'})

        await campaign.methods.finalizeRequest(0).send({from: accounts[0], gas: '1000000'})
        const request = await campaign.methods.requests(0).call()
        // const isRequestCompleted = request.complete


        assert(request.complete)

        let balance = await web3.eth.getBalance(accounts[1])
        balance = web3.utils.fromWei(balance, 'ether')
        console.log(balance)
        balance = parseFloat(balance)
        console.log(balance)
    })

})