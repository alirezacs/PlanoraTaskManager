import { Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    return (
        <header className="py-2 sticky top-0 z-50 border-solid border-gray-200 border-b-1 backdrop-blur-sm bg-white/30">
            <div className="container">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Button className="m-0">
                            <MenuIcon className="text-gray-900" fontSize="small" />
                        </Button>
                        <h1 className="text-xl font-semibold">Planora</h1>
                    </div>
                    <div className="flex items-center">
                        <Button size="small" className="!text-gray-900 !font-semibold">Today</Button>
                        <Button size="small" className="!text-gray-900 !font-semibold">Schedule</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;