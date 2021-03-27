import React from "react";
import "./Header.css";
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';

function Header() {
    return (
        <div className='header'>

            <IconButton>
                <FaceIcon fontSize="large" className="header_icon" />
            </IconButton>

            <img className="header_logo" src="https://cdn.pixabay.com/photo/2021/03/09/14/33/dog-6082017_640.jpg" alt="logo" />

            <IconButton>
                <ForumIcon fontSize="large" className="header__icon" />
            </IconButton>
        </div>
    );
}

export default Header;