import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

import Item from "./Item"

function AccordeonWrapper(props) {
    const { titulo } = props
    return (
        <Item>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    sx={{ background: 'green', color: 'white' }}
                >
                    <Typography>{titulo}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {props.children}
                </AccordionDetails>
            </Accordion>
        </Item>
    )
}

export default AccordeonWrapper