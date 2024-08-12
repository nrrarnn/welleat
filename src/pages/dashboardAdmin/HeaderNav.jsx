import { Button, Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";

const HeaderNav = ({handleExpandedSidebar}) => {
  return(
    <>
      <Navbar className="shadow-md py-2">
        <NavbarContent>
          <NavbarMenuToggle onClick={handleExpandedSidebar}/>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Button color="danger" variant="flat">Logout</Button>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default HeaderNav;