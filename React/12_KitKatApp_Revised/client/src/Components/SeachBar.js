import { Dropdown, Form } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <div className="search">
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                    Show All
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick="" href="#">All Flavors</Dropdown.Item>
                    <Dropdown.Item href="#">Year-Round Flavors</Dropdown.Item>
                    <Dropdown.Item href="#">Regional Flavors</Dropdown.Item>
                    <Dropdown.Item href="#">Seasonal Flavors</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Form>
                <Form.Control type="text" size="md" placeholder="Search Kit Kats" />
            </Form>
        </div>
    )
}

export default SearchBar