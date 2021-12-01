import Spinner from '../Spinner'
import { useState } from 'react'
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'
import { Form, Button, Grid, Message } from 'semantic-ui-react'


const ContributeForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async () => {
        // event.preventDefault()
        const campaign = Campaign(props.address)
        try {
            setError('')
            setLoading(true)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                    from: accounts[0],
                    value: web3.utils.toWei(value, 'ether')
                })
            Router.replaceRoute(`/campaign/${props.address}`)
            setLoading(false)
            setValue('')
        } catch (error) {
            setError(error.message)
            setLoading(false)

        }
    }
    return (
        <Form error={!!error}>
            <Form.Field>
                <label>Contribute to this campaign!</label>
                <input value={value} onChange={event => setValue(event.target.value)} />
            </Form.Field>
            <Message error header='Oops!'content={error}></Message>
            <Button onClick={onSubmit} primary loading={loading}>
                Contribute
            </Button>
        </Form>
    )
}

export default ContributeForm