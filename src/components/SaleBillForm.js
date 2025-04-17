import React, { useState, useEffect } from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
import api from "../services/api";
import "../style/SaleBillForm.css";

const SaleBillForm = () => {
  const initialBillData = {
    location: "Dr Aravinds IVF-PALAKKAD,Premier Tower,Above in SBI in touch",
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

  console.log(setProduct, "set");

  const [products, setProducts] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [cashTendered, setCashTendered] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Single");
  const [paymentType, setPaymentType] = useState("Cash");
  const [additionalNote, setAdditionalNote] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [subPaymentType, setSubPaymentType] = useState("");

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
        console.log(response, "res");

        const data = response.data?.[0];
        console.log(data, "data");
        if (!data) {
          console.warn("Product not found:", name);
          return;
        }

        // Assuming the API response returns details like manufacturer, batch, expiry, etc.
        setProduct((prevProduct) => ({
          ...prevProduct,
          manufacturer: data?.manufacturer || "",
          batch: data.batch || "",
          qty: data.qty,
          expiry: data.expiry,
          price: data.price, // Add price, assuming it's returned from the API
          gst: data.gst,
          discount: data.discount,
          total: data.total,
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

  const validateFields = () => {
    const errors = {};

    // Validate location
    // if (!billData.location.trim()) errors.location = "Location is required.";

    // Validate store
    if (!billData.store || billData.store.trim() === "") {
      errors.store = "Store is required.";
    }

    // Validate consultant
    if (!billData.consultant.trim()) errors.consultant = "Consultant is required.";

    // Validate patient name
    if (!billData.name.trim()) errors.name = "Patient Name is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handlePrintAndSave = async () => {
    // if (!validateFields()) {
    //   alert("Please fill all the required fields.");
    //   return;
    // }
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
        subPaymentType,
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
      <h4
        className="text-center mb-4"
        style={{
          color: "#28a745", // Green text color
          border: "2px solid #28a745", // Green border
          padding: "10px", // Adds padding inside the border
          borderRadius: "5px", // Optional: Adds rounded corners to the border
        }}
      >
        Sale Bill
      </h4>

      <Row className="mb-3">
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold">
              Location <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="location"
              placeholder="Location"
              value="Dr Aravinds IVF-PALAKKAD,Premier Tower,Above in SBI in touch"
              required
              isInvalid={validationErrors.location}
              onChange={handleChange}
              style={{ fontSize: "15px" }}
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
              value="PHARMACY PALAKKAD"
              required
              style={{ fontSize: "15px" }}
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
              isInvalid={validationErrors.consultant}
              required
              onChange={handleChange}
              style={{ fontSize: "15px" }}
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
              isInvalid={validationErrors.name}
              required
              onChange={handleChange}
              style={{ fontSize: "15px" }}
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
              style={{ fontSize: "15px" }}
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
              style={{ fontSize: "15px" }}
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
              style={{ fontSize: "15px" }}
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
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              S.No
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Product Name
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Mfr
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Batch
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Expiry
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Qty
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              MRP
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              GST(%)
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Disc(%)
            </th>
            <th
              style={{
                backgroundColor: "#f4f4f4",
                color: "orange",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Total
            </th>
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
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </td>
            <td>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Manufacturer"
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
                placeholder="Expiry Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                value={product.expiry}
                onChange={(e) =>
                  setProduct({ ...product, expiry: e.target.value })
                }
                style={{
                  backgroundColor: "#f4f4f4", // Set the input box background color
                }}
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
                  setProduct({
                    ...product,
                    price: parseFloat(e.target.value),
                  })
                }
                style={{
                  backgroundColor: "#f4f4f4", // Set the input box background color
                }}
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
                value={(product.total || 0).toFixed(2)}
                style={{
                  backgroundColor: "#f4f4f4", // Set the input box background color
                }}
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

      {/* Summary & Payment */}
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

      {/* Payment Options */}
      <Row className="mt-4">
        <Col md={5}>
          <Form.Group className="mb-2">
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

          <Form.Group className="mb-2">
            <Form.Label className="fw-bold">
              Payment Type <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
                setSubPaymentType(""); // Clear sub-type when type changes
              }}
            >
              <option value="">Select</option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </Form.Select>
          </Form.Group>

          {/* Conditional Sub-payment type dropdowns */}
          {paymentType === "UPI" && (
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">UPI Type</Form.Label>
              <Form.Select
                value={subPaymentType}
                onChange={(e) => setSubPaymentType(e.target.value)}
              >
                <option value="">Select</option>
                <option>Google Pay</option>
                <option>PhonePe</option>
                <option>Paytm</option>
              </Form.Select>
            </Form.Group>
          )}

          {paymentType === "Card" && (
            <Form.Group className="mb-2">
              <Form.Label className="fw-bold">Card Type</Form.Label>
              <Form.Select
                value={subPaymentType}
                onChange={(e) => setSubPaymentType(e.target.value)}
              >
                <option value="">Select</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
              </Form.Select>
            </Form.Group>
          )}
       
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
