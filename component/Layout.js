import Header from "./Header"

const Layout = (props) => {
    return (
        <div>
            <Header/>
            <div style={{marginTop: 40, maxWidth: 1080, margin: 'auto'}}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout