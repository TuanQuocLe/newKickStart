import { Link } from '../../routes'
import { Menu } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css';


const Header = () => {
    return (
        <div style={{backgroundColor: '#8fd3fe', marginBottom: 50}}>
            <Menu style={{maxWidth: 1080, margin: 'auto'}}>
                
                <Menu.Item className='item'><Link route='/'><h1>Bluebolt</h1></Link></Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item style={{fontSize: 20}} ><Link route='/'>Campaigns</Link></Menu.Item>
                    <Menu.Item style={{fontSize: 20}} ><Link route='/campaign/new'><a>+</a></Link></Menu.Item>
                </Menu.Menu>
            </Menu>

        </div>

        
    )
}

export default Header