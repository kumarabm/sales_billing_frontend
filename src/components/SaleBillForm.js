// import React, { useState } from "react";
// import { Form, Row, Col, Table, Button } from "react-bootstrap";

// const SaleBillForm = () => {
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

//   const [products, setProducts] = useState([]);

//   const handleProductAdd = () => {
//     const total =
//       product.qty * product.price +
//       (product.gst / 100) * product.price -
//       (product.discount / 100) * product.price;

//     const newProduct = { ...product, total };
//     setProducts([...products, newProduct]);
//     setProduct({
//       name: "",
//       manufacturer: "",
//       batch: "",
//       expiry: "",
//       qty: 0,
//       price: 0,
//       gst: 0,
//       discount: 0,
//       total: 0,
//     });
//   };

//   const handleDeleteProduct = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
//   };

//   return (
//     <div className="container mt-4">
//       <h4 className="text-center mb-4">Sale Bill</h4>

//       {/* OP Type and Search */}
//       <Row className="mb-3">
//         <Col md={2}>
//           <Form.Select>
//             <option>OP</option>
//             <option>IP</option>
//           </Form.Select>
//         </Col>
//         <Col md={3}>
//           <Form.Control type="text" placeholder="Search OP #" />
//         </Col>
//         <Col md={3}>
//           <Form.Control placeholder="Consultant Name" />
//         </Col>
//         <Col md={2}>
//           <Form.Control placeholder="Patient Name" />
//         </Col>
//         <Col md={2}>
//           <Form.Control placeholder="Mobile" />
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={3}>
//           <Form.Control placeholder="Location" />
//         </Col>
//         <Col md={3}>
//           <Form.Control placeholder="Store" />
//         </Col>
//         <Col md={2}>
//           <Form.Control placeholder="Age" />
//         </Col>
//         <Col md={2}>
//           <Form.Select>
//             <option>Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//           </Form.Select>
//         </Col>
//       </Row>

//       {/* Product Entry */}
//       <h5 className="mt-4">Products</h5>
//       <Table bordered size="sm">
//         <thead className="text-center bg-light">
//           <tr>
//             <th>S.No</th>
//             <th>Product Name</th>
//             <th>Mfr</th>
//             <th>Batch</th>
//             <th>Expiry</th>
//             <th>Qty</th>
//             <th>MRP</th>
//             <th>GST(%)</th>
//             <th>Disc(%)</th>
//             <th>Total</th>
//             {/* <th>Add</th> */}
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           <tr>
//             <td>{products.length + 1}</td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 placeholder="Product Name"
//                 value={product.name}
//                 onChange={(e) => setProduct({ ...product, name: e.target.value })}
//               />
//             </td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 placeholder="Manufacturer"
//                 value={"Manufacturer"}
//                 onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
//               />
//             </td>
//             <td>
//   <Form.Select
//     size="sm"
//     value={product.batch}
//     onChange={(e) => setProduct({ ...product, batch: e.target.value })}
//   >
//     <option value="">Select</option>
//     {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
//       <option key={num} value={num}>{num}</option>
//     ))}
//   </Form.Select>
// </td>

//             <td>
//             <Form.Control
//   size="sm"
//   type="text"
//   placeholder="Expiry Date"
//   onFocus={(e) => (e.target.type = 'date')}
//   onBlur={(e) => {
//     if (!e.target.value) e.target.type = 'text';
//   }}
//   value={product.expiry}
//   onChange={(e) => setProduct({ ...product, expiry: e.target.value })}
// />

//             </td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 type="number"
//                 placeholder="Qty"
//                 value={product.qty}
//                 onChange={(e) => setProduct({ ...product, qty: parseInt(e.target.value) })}
//               />
//             </td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 type="number"
//                 placeholder="Price"
//                 value={product.price}
//                 onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
//               />
//             </td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 type="number"
//                 value={product.gst}
//                 onChange={(e) => setProduct({ ...product, gst: parseFloat(e.target.value) })}
//               />
//             </td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 type="number"
//                 value={product.discount}
//                 onChange={(e) => setProduct({ ...product, discount: parseFloat(e.target.value) })}
//               />
//             </td>
//             <td>
//               <Form.Control
//                 size="sm"
//                 readOnly
//                 placeholder="Total"
//                 value={product.total.toFixed(2)}
//               />
//             </td>
//             <td>
//               <Button size="sm" variant="primary" onClick={handleProductAdd}>
//                 Add
//               </Button>
//             </td>
//           </tr>
//         </tbody>
//       </Table>

//       {/* Added Products with Delete */}
//       <ul className="list-group mt-3">
//         {products.map((p, idx) => (
//           <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//               <strong>{idx + 1}.</strong> {p.name} - ₹{p.total.toFixed(2)}
//             </div>
//             <Button
//               size="sm"
//               variant="danger"
//               onClick={() => handleDeleteProduct(idx)}
//             >
//               Delete
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SaleBillForm;

// import React, { useState, useEffect } from "react";
// import { Form, Row, Col, Table, Button } from "react-bootstrap";

// const SaleBillForm = () => {
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

//   const [products, setProducts] = useState([]);

//   const [paymentMode, setPaymentMode] = useState("Single");
//   const [paymentType, setPaymentType] = useState("Cash");
//   const [additionalNote, setAdditionalNote] = useState("");
//   const [discountPercentage, setDiscountPercentage] = useState(5);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [amountReceived, setAmountReceived] = useState(0);
//   const [cashTendered, setCashTendered] = useState(0);

//   const [totals, setTotals] = useState({
//     totalAmount: 0,
//     discountAmount: 0,
//     amountReceivable: 0,
//     due: 0,
//     balance: 0,
//   });

//   const handleProductAdd = () => {
//     const itemTotal =
//       product.qty * product.price +
//       (product.gst / 100) * product.price -
//       (product.discount / 100) * product.price;

//     const newProduct = { ...product, total: itemTotal };
//     setProducts([...products, newProduct]);
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

//   const handleDeleteProduct = (index) => {
//     const updated = [...products];
//     updated.splice(index, 1);
//     setProducts(updated);
//   };

//   useEffect(() => {
//     const sumTotal = products.reduce((sum, p) => sum + p.total, 0);
//     const discountAmt = (discountPercentage / 100) * sumTotal;
//     const amountReceivable = sumTotal - discountAmt + parseFloat(additionalCharges || 0);
//     const due = amountReceivable - parseFloat(amountReceived || 0);
//     const balance = parseFloat(cashTendered || 0) - amountReceivable;

//     setTotals({
//       totalAmount: sumTotal,
//       discountAmount: discountAmt,
//       amountReceivable,
//       due: due < 0 ? 0 : due,
//       balance: balance < 0 ? 0 : balance,
//     });
//   }, [products, discountPercentage, additionalCharges, amountReceived, cashTendered]);

//   return (
//     <div className="container mt-4">
//       {/* Product table and inputs can be added here */}

//       {/* Summary & Calculations */}
//       <Row className="mt-4">
//         <Col md={{ span: 4, offset: 8 }}>
//           <div className="border p-3 rounded bg-light">
//             <p><strong>Total:</strong> ₹{totals.totalAmount.toFixed(2)}</p>
//             <Form.Group className="mb-2">
//               <Form.Label>Discount in %</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
//               />
//             </Form.Group>
//             <p><strong>Discount Amount:</strong> ₹{totals.discountAmount.toFixed(2)}</p>

//             <Form.Group className="mb-2">
//               <Form.Label>Additional Charges</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={additionalCharges}
//                 onChange={(e) => setAdditionalCharges(parseFloat(e.target.value))}
//               />
//             </Form.Group>

//             <p><strong>Amount Receivable:</strong> ₹{totals.amountReceivable.toFixed(2)}</p>

//             <Form.Group className="mb-2">
//               <Form.Label>Amount Received</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={amountReceived}
//                 onChange={(e) => setAmountReceived(parseFloat(e.target.value))}
//               />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Cash Tendered</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={cashTendered}
//                 onChange={(e) => setCashTendered(parseFloat(e.target.value))}
//               />
//             </Form.Group>

//             <p><strong>Due:</strong> ₹{totals.due.toFixed(2)}</p>
//             <p><strong>Balance:</strong> ₹{totals.balance.toFixed(2)}</p>
//           </div>
//         </Col>
//       </Row>

//       {/* Payment Info Section */}
//       <Row className="mt-4">
//         <Col md={3}>
//           <Form.Label>Payment Mode</Form.Label><br />
//           <Form.Check
//             inline
//             label="Single"
//             name="paymentMode"
//             type="radio"
//             checked={paymentMode === "Single"}
//             onChange={() => setPaymentMode("Single")}
//           />
//           <Form.Check
//             inline
//             label="Multiple"
//             name="paymentMode"
//             type="radio"
//             checked={paymentMode === "Multiple"}
//             onChange={() => setPaymentMode("Multiple")}
//           />
//         </Col>

//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Payment Type *</Form.Label>
//             <Form.Select
//               value={paymentType}
//               onChange={(e) => setPaymentType(e.target.value)}
//             >
//               <option>Cash</option>
//               <option>Card</option>
//               <option>UPI</option>
//               <option>Bank Transfer</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Additional Note</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               value={additionalNote}
//               onChange={(e) => setAdditionalNote(e.target.value)}
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default SaleBillForm;

import React, { useState, useEffect } from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";

const SaleBillForm = () => {
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

  const [products, setProducts] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [cashTendered, setCashTendered] = useState(0);

  const totalAmount = products.reduce((acc, p) => acc + p.total, 0);
  const discountAmount = (totalAmount * discountPercent) / 100;
  const amountReceivable =
    totalAmount - discountAmount + parseFloat(additionalCharges || 0);
  const balance = parseFloat(cashTendered || 0) - amountReceivable;

  const [paymentMode, setPaymentMode] = useState("Single");
  const [paymentType, setPaymentType] = useState("Cash");
  const [additionalNote, setAdditionalNote] = useState("");

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

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Sale Bill</h4>

      {/* OP Type and Search */}
      <Row className="mb-3">
        <Col md={2}>
          <Form.Select>
            <option>OP</option>
            <option>IP</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Control type="text" placeholder="Search OP #" />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Location <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control placeholder="location" required />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Store <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control placeholder="store" required />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Consultant Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control placeholder="consultant name" required />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
               Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control placeholder="Name" required />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">Mobile</Form.Label>
            <Form.Control placeholder="Mobile" required />
          </Form.Group>
        </Col>

        <Col md={1}>
          <Form.Group>
            <Form.Label className="fw-bold">Age</Form.Label>
            <Form.Control placeholder="Age" type="number" required />
          </Form.Group>
        </Col>

        <Col md={1}>
          <Form.Group>
            <Form.Label className="fw-bold">Gender</Form.Label>
            <Form.Select required>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Product Table */}
      <Table bordered size="sm">
        <thead className="text-center bg-light">
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
            <th>Add</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>{products.length + 1}</td>
            <td>
              <Form.Control
                size="sm"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                value={product.manufacturer}
                onChange={(e) =>
                  setProduct({ ...product, manufacturer: e.target.value })
                }
              />
            </td>
            <td>
              <Form.Select
                size="sm"
                value={product.batch}
                onChange={(e) =>
                  setProduct({ ...product, batch: e.target.value })
                }
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
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                value={product.expiry}
                onChange={(e) =>
                  setProduct({ ...product, expiry: e.target.value })
                }
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.qty}
                onChange={(e) =>
                  setProduct({ ...product, qty: parseInt(e.target.value) })
                }
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.gst}
                onChange={(e) =>
                  setProduct({ ...product, gst: parseFloat(e.target.value) })
                }
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="number"
                value={product.discount}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    discount: parseFloat(e.target.value),
                  })
                }
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
              <Button size="sm" variant="primary" onClick={handleProductAdd}>
                Add
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Products Added */}
      <ul className="list-group mt-3">
        {products.map((p, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{idx + 1}.</strong> {p.name} - ₹{p.total.toFixed(2)}
            </div>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDeleteProduct(idx)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <Row className="mt-4 justify-content-end">
        <Col md={5}>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Total Amount:
            </Col>
            <Col xs={6}>₹{totalAmount.toFixed(2)}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Discount %:
            </Col>
            <Col xs={6}>
              <Form.Control
                type="number"
                value={discountPercent}
                onChange={(e) =>
                  setDiscountPercent(parseFloat(e.target.value) || 0)
                }
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Discount Amount:
            </Col>
            <Col xs={6}>₹{discountAmount.toFixed(2)}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Additional Charges:
            </Col>
            <Col xs={6}>
              <Form.Control
                type="number"
                value={additionalCharges}
                onChange={(e) =>
                  setAdditionalCharges(parseFloat(e.target.value) || 0)
                }
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Amount Receivable:
            </Col>
            <Col xs={6}>₹{amountReceivable.toFixed(2)}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Cash Tendered:
            </Col>
            <Col xs={6}>
              <Form.Control
                type="number"
                value={cashTendered}
                onChange={(e) =>
                  setCashTendered(parseFloat(e.target.value) || 0)
                }
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6} className="fw-bold">
              Balance:
            </Col>
            <Col xs={6}>
              <Form.Control readOnly value={balance.toFixed(2)} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Payment Info Section */}
      <Row className="mt-4">
        <Col md={5}>
          {/* Payment Mode */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">
              Payment Mode <span className="text-danger">*</span>
            </Form.Label>
            <div>
              <Form.Check
                inline
                label="Single"
                name="paymentMode"
                type="radio"
                checked={paymentMode === "Single"}
                onChange={() => setPaymentMode("Single")}
              />
              <Form.Check
                inline
                label="Multiple"
                name="paymentMode"
                type="radio"
                checked={paymentMode === "Multiple"}
                onChange={() => setPaymentMode("Multiple")}
              />
            </div>
          </Form.Group>

          {/* Payment Type */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">
              Payment Type <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="">Select</option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </Form.Select>
          </Form.Group>

          {/* Additional Note */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Additional Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="Any remarks or notes..."
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default SaleBillForm;
