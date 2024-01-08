import React from 'react';
import toString, { parseAmountFormat } from '../../shared/functions';
import "./prodcutlist.css"
import { useCustomDialog } from '../../hooks/CustomDialogContext';

export interface Product {
  _id?: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ProductListProps {
  productos: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (productId: string, updatedProduct: Product) => void;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

const ProductList: React.FC<ProductListProps> = (props: ProductListProps) => {
  const [products, setProducts] = React.useState<Product[]>(props.productos);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState<Product>({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const { openLoading, closeLoading, openDialog } = useCustomDialog();
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Nombre y precio son campos obligatorios.');
      return;
    }

    setProducts([...products, { ...newProduct }]);
    setNewProduct({  name: '', price: '', description: '', image: '' });
    setShowAddForm(false);
    props.onAddProduct(newProduct)
  };

  const handleDeleteProduct = (productId: string) => {
    openDialog({
      title: "¿ Esta seguro de querer eliminar este producto ?",
      message: "Esta opción eliminar este producto, por lo que si lo quiere de vuelta, deberá cargarlo nuevamente.",
      buttonSubmit: {
        caption: "Eliimnar",
        color: "primary",
        onClick: () => {
          openLoading({title: "eliminando, por favor aguarde"});
          setTimeout(() => {
            setProducts(products.filter(product => product._id !== productId));
            props.onDeleteProduct(productId);
            closeLoading();
          },1500)
        }
      }
    })
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowAddForm(true);
    props.onUpdateProduct(toString(product._id), product);
  };

  const handleUpdateProduct = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    if (editingProduct) {

      setProducts(products.map(product => (product._id === editingProduct._id ? newProduct : product)));
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', description: '', image: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <button onClick={() => setShowAddForm(true)}>Agregar Producto</button>

      {showAddForm && (
        <div>
          <h2>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
          <form ref={formRef}>
            <label>
              Nombre:
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </label>
            <label>
              Precio:
              <input
                type="text"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </label>
            <label>
              Imagen:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target) {
                        setNewProduct({ ...newProduct, image: event.target.result as string });
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </label>
            <button type="button" onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
              {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
            </button>
          </form>
        </div>
      )}

      {products.length === 0 ? (
        <p>No hay productos cargados actualmente.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={key}>
                <td>{product.name}</td>
                <td title={product.description}>{truncateText(product.description, 50)}</td>
                <td>${parseAmountFormat(product.price)}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(toString(product._id))}>Eliminar</button>
                  <button onClick={() => handleEditProduct(product)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
