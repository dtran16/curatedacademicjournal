import React from "react"
import styled from 'styled-components';

import { RowContainer } from '../components/ContainerStyles';

const Navbar = () => {
    return (
        <NavbarContainer>
            <LogoName>Curator</LogoName>
            <Profile>
                <Image
                    src=""
                    alt="Profile"
                    height="50px"
                    width="50px"
                />
            </Profile>
        </NavbarContainer>
    )
}

export default Navbar;

const NavbarContainer = RowContainer.extend`

`;

const LogoName = styled.div`

`;
