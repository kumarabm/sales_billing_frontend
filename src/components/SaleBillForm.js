// import React, { useState } from "react";
// import api from "../services/api";

// const SaleBillForm = () => {
//   const [billData, setBillData] = useState({
//     location: "",
//     store: "",
//     consultant: "",
//     name: "",
//     mobile: "",
//     age: "",
//     gender: "",
//     products: [],
//     discountPercentage: 5,
//     discountAmount: 0,
//     additionalCharges: 0,
//     amountReceivable: 0,
//     amountReceived: 0,
//     due: 0,
//     paymentMode: "Single",
//     paymentType: "Cash",
//     note: "",
//   });

//   const [product, setProduct] = useState({
//     name: "",
//     manufacturer: "",
//     batch: "",
//     expiry: "",
//     qty: 1,
//     price: 0,
//     gst: 0,
//     discount: 0,
//     total: 0,
//   });

//   const handleProductAdd = () => {
//     const total =
//       product.qty * product.price +
//       (product.gst / 100) * product.price -
//       (product.discount / 100) * product.price;

//     const newProduct = { ...product, total };
//     setBillData({
//       ...billData,
//       products: [...billData.products, newProduct],
//     });

//     setProduct({
//       name: "",
//       manufacturer: "",
//       batch: "",
//       expiry: "",
//       qty: 1,
//       price: 0,
//       gst: 0,
//       discount: 0,
//       total: 0,
//     });
//   };

//   const handleChange = (e) => {
//     setBillData({ ...billData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await api.post("/sale-bills", billData);
//       alert("Sale Bill Saved!");
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving bill");
//     }
//   };

//   return (
//     <div>
//       <h2>Sale Bill</h2>

//       {/* Patient Details */}
//       <input placeholder="Location" name="location" onChange={handleChange} />
//       <input placeholder="Store" name="store" onChange={handleChange} />
//       <input placeholder="Consultant" name="consultant" onChange={handleChange} />
//       <input placeholder="Name" name="name" onChange={handleChange} />
//       <input placeholder="Mobile" name="mobile" onChange={handleChange} />
//       <input placeholder="Age" name="age" onChange={handleChange} />
//       <select name="gender" onChange={handleChange}>
//         <option value="">Select Gender</option>
//         <option>Male</option>
//         <option>Female</option>
//       </select>

//       <hr />

//       {/* Product Form */}
//       <input
//         placeholder="Product Name"
//         value={product.name}
//         onChange={(e) => setProduct({ ...product, name: e.target.value })}
//       />
//       <input
//         placeholder="Manufacturer"
//         value={product.manufacturer}
//         onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
//       />
//       <input
//         placeholder="Batch"
//         value={product.batch}
//         onChange={(e) => setProduct({ ...product, batch: e.target.value })}
//       />
//       <input
//         placeholder="Expiry"
//         value={product.expiry}
//         onChange={(e) => setProduct({ ...product, expiry: e.target.value })}
//       />
//       <input
//         placeholder="Qty"
//         type="number"
//         value={product.qty}
//         onChange={(e) => setProduct({ ...product, qty: parseInt(e.target.value) })}
//       />
//       <input
//         placeholder="Price"
//         type="number"
//         value={product.price}
//         onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
//       />
//       <input
//         placeholder="GST %"
//         type="number"
//         value={product.gst}
//         onChange={(e) => setProduct({ ...product, gst: parseFloat(e.target.value) })}
//       />
//       <input
//         placeholder="Discount %"
//         type="number"
//         value={product.discount}
//         onChange={(e) => setProduct({ ...product, discount: parseFloat(e.target.value) })}
//       />
//       <button onClick={handleProductAdd}>Add Product</button>

//       <ul>
//         {billData.products.map((p, idx) => (
//           <li key={idx}>{p.name} - Qty: {p.qty}, Total: ₹{p.total.toFixed(2)}</li>
//         ))}
//       </ul>

//       <hr />

//       <input
//         placeholder="Note"
//         name="note"
//         onChange={handleChange}
//       />
//       <button onClick={handleSubmit}>Submit Sale Bill</button>
//     </div>
//   );
// };

// export default SaleBillForm;

import React, { useState, useEffect } from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
import api from "../services/api";

const SaleBillForm = () => {
  const initialBillData = {
    location: "",
    store: "",
    consultant: "",
    name: "",
    mobile: "",
    age: "",
    gender: "",
    products: [],
    total: 0,
    discountPercentage: 0,
    discountAmount: 0,
    discount: 0,
    additionalCharges: 0,
    amountReceivable: 0,
    amountReceived: 0,
    due: 0,
    cashTendered: 0,
    balance: 0,
    paymentMode: "Single",
    paymentType: "Cash",
    note: "",
  };

  const [billData, setBillData] = useState(initialBillData);
  const [product, setProduct] = useState({
    name: "",
    manufacturer: "",
    batch: "",
    expiry: "",
    qty: 1,
    price: 0,
    gst: 0,
    discount: 0,
    total: 0,
  });

  console.log(setProduct,"set")
  

  const [products, setProducts] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [cashTendered, setCashTendered] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Single");
  const [paymentType, setPaymentType] = useState("Cash");
  const [additionalNote, setAdditionalNote] = useState("");

  useEffect(() => {
    if (billData.mobile.length === 10) {
      fetchCustomerData(billData.mobile);
    }
  }, [billData.mobile]);

  const fetchCustomerData = async (mobile) => {
    try {
      const response = await api.get(`/sale-bills/customer/${mobile}`);
      const data = response.data;

      // Autofill customer details
      setBillData((prev) => ({
        ...prev,
        name: data.name,
        age: data.age,
        gender: data.gender,
        consultant: data.consultant,
      }));

      // Add existing products to state (optional, or just show somewhere)
      setProducts(data.products || []);
    } catch (err) {
      console.log("Customer not found, new entry.");
      // Reset form if it's a new customer
      setBillData((prev) => ({
        ...prev,
        name: "",
        age: "",
        gender: "",
        consultant: "",
      }));
      setProducts([]);
    }
  };

const fetchProductDetails = async (name) => {
    try {
      if (name.trim() !== "") {
        const response = await api.get(`/sale-bills/product/${name}`);
        console.log(response,"res")
        
        const data = response.data;
        console.log(data,"data")
        

        // Assuming the API response returns details like manufacturer, batch, expiry, etc.
        setProduct((prevProduct) => ({
          ...prevProduct,
          manufacturer: data.manufacturer,
          batch: data.batch || "",
          qty:data.qty,
          expiry: data.expiry,
          price: data.price, // Add price, assuming it's returned from the API
          gst: data.gst,
          discount: data.discount,
          total:data.total
        }));
      }
    } catch (err) {
      console.error("Error fetching product details", err);
    }
  };

  useEffect(() => {
    if (product.name.length >= 3) {
      fetchProductDetails(product.name);
    }
  }, [product.name]);
  
  const totalAmount = products.reduce((acc, p) => acc + p.total, 0);
  const discountAmount = (totalAmount * discountPercent) / 100;
  const amountReceivable =
    totalAmount - discountAmount + parseFloat(additionalCharges || 0);
  const balance = parseFloat(cashTendered || 0) - amountReceivable;

  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  const handleProductAdd = () => {
    const total =
      product.qty * product.price +
      (product.gst / 100) * product.price -
      (product.discount / 100) * product.price;

    const newProduct = { ...product, total };
    setProducts([...products, newProduct]);
    setProduct({
      name: "",
      manufacturer: "",
      batch: "",
      expiry: "",
      qty: 1,
      price: 0,
      gst: 0,
      discount: 0,
      total: 0,
    });
  };

//   const handleDeleteProduct = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
//   };

  const handlePrintAndSave = async () => {
    try {
      const finalData = {
        ...billData,
        products,
        total: totalAmount,
        discountPercentage: discountPercent,
        discountAmount,
        additionalCharges,
        amountReceivable,
        amountReceived: 0,
        due: amountReceivable,
        cashTendered,
        balance,
        paymentMode,
        paymentType,
        note: additionalNote,
      };

      await api.post("/sale-bills/newcustomer", finalData);
      window.print();

      alert("Bill saved and ready for print!");

      // Clear form (optional)
      setBillData(initialBillData);
      setProducts([]);
      setProduct({
        name: "",
        manufacturer: "",
        batch: "",
        expiry: "",
        qty: 1,
        price: 0,
        gst: 0,
        discount: 0,
        total: 0,
      });
      setAdditionalCharges(0);
      setDiscountPercent(0);
      setCashTendered(0);
      setPaymentMode("Single");
      setPaymentType("Cash");
      setAdditionalNote("");
    } catch (err) {
      console.error(err);
      alert("Error saving the bill.");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Sale Bill</h4>

      <Row className="mb-3">
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Location <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="location"
              placeholder="Location"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Store <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="store"
              placeholder="Store"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Consultant <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="consultant"
              placeholder="Consultant"
              value={billData.consultant}
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Patient Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="name"
              placeholder="Name"
              value={billData.name}
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">Mobile</Form.Label>
            <Form.Control
              name="mobile"
              placeholder="Mobile"
              value={billData.mobile} // Ensure binding value to mobile state
              required
              onChange={handleChange} // Ensure onChange updates mobile
            />
          </Form.Group>
        </Col>

        <Col md={1}>
          <Form.Group>
            <Form.Label className="fw-bold">Age</Form.Label>
            <Form.Control
              name="age"
              type="number"
              placeholder="Age"
              value={billData.age}
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={1}>
          <Form.Group>
            <Form.Label className="fw-bold">Gender</Form.Label>
            <Form.Select
              name="gender"
              required
              onChange={handleChange}
              value={billData.gender}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Product Table */}
      <Table bordered size="sm">
        <thead className="text-center">
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Mfr</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>Qty</th>
            <th>MRP</th>
            <th>GST(%)</th>
            <th>Disc(%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>{products.length + 1}</td>
            <td>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Manufacturer"
                value={product.manufacturer}
                onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
              />
            </td>
            <td>
              <Form.Select
                size="sm"
                value={product.batch}
                onChange={(e) => setProduct({ ...product, batch: e.target.value })}
              >
                <option value="">Select</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Expiry Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                value={product.expiry}
                onChange={(e) => setProduct({ ...product, expiry: e.target.value })}
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.qty}
                onChange={(e) => setProduct({ ...product, qty: parseInt(e.target.value) })}
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.gst}
                onChange={(e) => setProduct({ ...product, gst: parseFloat(e.target.value) })}
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.discount}
                onChange={(e) => setProduct({ ...product, discount: parseFloat(e.target.value) })}
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                readOnly
                value={product.total.toFixed(2)}
              />
            </td>
            <td>
              <Button
                size="sm"
                variant="primary"
                onClick={handleProductAdd}
              >
                Add
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Summary & Payment */}
      <Row className="mt-4">
        <Col md={5}>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Total Amount:</Col>
            <Col xs={6}>₹{totalAmount.toFixed(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Discount %:</Col>
            <Col xs={6}>
              <Form.Control
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Additional Charges:</Col>
            <Col xs={6}>
              <Form.Control
                type="number"
                value={additionalCharges}
                onChange={(e) => setAdditionalCharges(parseFloat(e.target.value) || 0)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Amount Receivable:</Col>
            <Col xs={6}>₹{amountReceivable.toFixed(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Cash Tendered:</Col>
            <Col xs={6}>
              <Form.Control
                type="number"
                value={cashTendered}
                onChange={(e) => setCashTendered(parseFloat(e.target.value) || 0)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Balance:</Col>
            <Col xs={6}>
              <Form.Control
                readOnly
                value={balance.toFixed(2)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Payment Options */}
      <Row className="mt-4">
        <Col md={5}>
          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">Payment Mode <span className="text-danger">*</span></Form.Label>
            <div>
              <Form.Check inline label="Single" name="paymentMode" type="radio" checked={paymentMode === "Single"} onChange={() => setPaymentMode("Single")} />
              <Form.Check inline label="Multiple" name="paymentMode" type="radio" checked={paymentMode === "Multiple"} onChange={() => setPaymentMode("Multiple")} />
            </div>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">Payment Type <span className="text-danger">*</span></Form.Label>
            <Form.Select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
              <option value="">Select</option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-bold">Additional Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="Remarks or instructions..."
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-4 text-end">
        <Button variant="success" onClick={handlePrintAndSave}>
          Print & Save
        </Button>
      </div>
    </div>
  );
};

export default SaleBillForm;


