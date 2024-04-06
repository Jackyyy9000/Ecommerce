import { Paper, Table, TableRow, TableCell, TableBody, Accordion, AccordionDetails, AccordionSummary, Typography, Box, TableHead } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Orders() {

    const [orders, setOrders] = useState<Order[] | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponents message='Loading orders...'/>

    return (
        <Box sx={{pb: 4}}>
            {orders?.reverse().map((order) => (
                <Accordion component={Paper} key={order.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Table aria-label="simple table">
                            <TableRow>
                                <TableCell sx={{borderBottom: "0", width: "25%"}}> Order number: #{order.id} </TableCell>
                                <TableCell sx={{borderBottom: "0", width: "25%"}}> Total: {currencyFormat(order.total)} </TableCell>
                                <TableCell sx={{borderBottom: "0", width: "25%"}}> Date: {order.orderDate.split('T')[0]} </TableCell>
                                <TableCell sx={{borderBottom: "0", width: "25%"}}> Status: {order.orderStatus} </TableCell>
                            </TableRow>
                        </Table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography variant="h5" sx={{pb: 2}}>Items</Typography>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Product</TableCell>
                                    <TableCell align="center">Brand</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.orderItems.flatMap(item => (
                                    <TableRow key={item.productId}>
                                        <TableCell align="left" sx={{borderBottom: "0"}}>
                                            <Box display='flex' alignItems='center'> 
                                                <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}></img>
                                                <span>{item.name}</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{borderBottom: "0"}}>{item.brand}</TableCell>
                                        <TableCell align="center" sx={{borderBottom: "0"}}>{item.type}</TableCell>
                                        <TableCell align="center" sx={{borderBottom: "0"}}>${(item.price / 100).toFixed(2)} </TableCell>
                                        <TableCell align="center" sx={{borderBottom: "0"}}>{item.quantity} </TableCell>
                                        <TableCell align="center" sx={{borderBottom: "0"}}>${(item.price * item.quantity / 100).toFixed(2)} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        

                        <Typography variant="h5" sx={{pb: 2, pt: 2}}>Contact information</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Full name</TableCell>
                                    <TableCell align="center">Address 1</TableCell>
                                    <TableCell align="center">Address 2</TableCell>
                                    <TableCell align="center">Zip code</TableCell>
                                    <TableCell align="center">City</TableCell>
                                    <TableCell align="center">County</TableCell>
                                    <TableCell align="center">Country</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.fullName}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.address1}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.address2}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.zip}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.city}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.county}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: "0"}}>{order.shippingAddress.country}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}