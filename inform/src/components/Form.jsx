import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types"; 
import { useState, useEffect } from "react";

const ModalForm = ({ show, handleClose, fields, onSubmit, initialData, id, creaEdit }) => {
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  // Cuando se abra el modal, actualizar formData con los datos del informe a editar
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(fields.reduce((acc, field) => ({ 
        ...acc, [field.name]: field.defaultValue || "" 
      }), {}));
    }
  }, [initialData, fields]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Validar que todos los campos estén llenos
    fields.forEach((field) => {
      if (!formData[field.name]?.toString().trim()) {
        newErrors[field.name] = `El campo ${field.label} es obligatorio`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (creaEdit == true) {
      onSubmit(formData);
    }
    else{
     onSubmit(id, formData); 
    }
    
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose} className="pt-10">
      <Modal.Header closeButton className="bg-dark px-3 text-white w-100 ">
        <Modal.Title className="!text-[18px]">{initialData ? "EDITAR INFORME" : "CREAR INFORME"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white px-4 text-black max-h-[400px] overflow-y-auto">
        <Form>
          {fields.map((field) => (
            <Form.Group key={field.name}>
              <Form.Label className="mb-0 font-thin">{field.label}</Form.Label>
              {field.type === "select" ? (
                <Form.Select
                  className="bg-white mb-3 h-10"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  className="bg-white mb-3 h-10"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  isInvalid={!!errors[field.name]}
                />
              )}
              {errors[field.name] && <Form.Text className="text-danger">{errors[field.name]}</Form.Text>}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark px-5">
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialData ? "Actualizar" : "Crear"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, 
  creaEdit: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      defaultValue: PropTypes.string,
      options: PropTypes.array, // Para selects
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object, 
};

export default ModalForm;
