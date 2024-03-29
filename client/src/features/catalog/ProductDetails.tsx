import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'


export default function ProductDetails() {
    const {id} = useParams<(id: string)>();

    return (
        <Typography variant="h1" color="initial">
            Product details
        </Typography>
    )
}