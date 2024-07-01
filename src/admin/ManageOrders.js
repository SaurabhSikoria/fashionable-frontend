import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
} from "../features/orderSlice";
import AdminDashboard from "./AdminDashboard";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const { user, token } = useSelector((state) => state.auth.user);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const filterOrders = (status) => {
      if (status === "all") return orders;
      return orders.filter((order) => order.status === status);
    };

    setFilteredOrders(filterOrders(activeTab));
  }, [orders, activeTab]);

  const handleUpdateStatus = () => {
    dispatch(
      updateOrderStatus({
        userId: user._id,
        orderId: selectedOrder._id,
        status: newStatus,
        token,
      })
    );
    setShowModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId, token));
  };

  return (
    <AdminDashboard>
      <div className="container-fluid mt-5">
        <h2 className="mb-4">Manage Orders</h2>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="all">All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pending">Pending</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="shipped">Shipped</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="delivered">Delivered</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cancelled">Cancelled</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey={activeTab}>
              <Table
                striped
                bordered
                hover
                className="mt-3"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Products</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.user.email}</td>
                        <td>
                          <ul style={{ listStyle: "none", padding: 0 }}>
                            {order.products?.map((product, index) => (
                              <li key={index}>{product._id}</li>
                            ))}
                          </ul>
                        </td>
                        <td>${order.amount}</td>
                        <td>{order.status}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowModal(true);
                            }}
                          >
                            Update Status
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        No orders found for the selected status.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>New Status</Form.Label>
                <Form.Control
                  as="select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="Enter new status"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateStatus}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminDashboard>
  );
};

export default ManageOrders;
