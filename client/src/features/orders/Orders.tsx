import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";

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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Order number</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Order Date</TableCell>
                        <TableCell align="center">Order Status</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                        key={order.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                            {order.id}
                        </TableCell>
                        <TableCell align="center">{currencyFormat(order.total)}</TableCell>
                        <TableCell align="center">{order.orderDate.split('T')[0]}</TableCell>
                        <TableCell align="center">{order.orderStatus}</TableCell>
                        <TableCell align="center">
                            {
                                // missing the view order page, will do later
                            }
                            <Button>View</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}