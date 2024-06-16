import Logo from '../assets/Logo.png'


const Header = () => {
    return (
        <div className="flex justify-start">
            <img src={Logo} alt="logo" className={'md:w-52 mt-10 ml-5 md:ml-20 w-40'} />
        </div>
    )
}

export default Header