const Home = () => {
    return (<>
    Name	Type	Default	Description
as	
elementType
'button'	Set a custom element for this component
bsPrefix	
string
'accordion-button'	Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.
onClick	
func
A callback function for when this component is clicked
AccordionCollapse
import AccordionCollapse from 'react-bootstrap/AccordionCollapse'

This component accepts all of Collapse's props.
Name	Type	Default	Description
as	
elementType
'div'	Set a custom element for this component
eventKey Required	
string
A key that corresponds to the toggler that triggers this collapse's expand or collapse.
children Required	
element
Children prop should only contain a single child, and is enforced as such
    </>)
}
export default Home;