import React from 'react';
import ProductList, { Product } from '../../components/admin-productlist/ProductList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCustomDialog } from '../../hooks/CustomDialogContext';

import "./adminpanel.css"

interface AdminPanelProps {
  token: string;
  isAdmin: boolean
}

const AdminPanel: React.FC<AdminPanelProps> = (props: AdminPanelProps) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const history = useNavigate();
  const { openLoading, closeLoading } = useCustomDialog();
  const loaded = React.useRef<boolean>(false);

  React.useEffect(() => {
    openLoading({title: "Cargando producos"});
    axios.get("http://localhost:4001/products")
      .then(res => {
        setProducts(res.data);
        loaded.current = true;
        closeLoading()
      })
      .catch(err => {
        console.error(err);
        closeLoading();
      });
  },[]);

  const handleAddProduct = (newProduct: Product) => {
    const body = {
      products: [newProduct],
      token: props.token
    }
    axios.post("http://localhost:4001/admin/products", body)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
    
    setProducts([...products, { ...newProduct }]);
  };

  const handleDeleteProduct = (productId: string) => {
    axios.delete(`http://localhost:4001/admin/products/${productId}`)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
    setProducts(products.filter(product => product._id !== productId));
  };

  const handleUpdateProduct = (productId: string, updatedProduct: Product) => {  
    const indiceObjeto = products.findIndex(objeto => objeto._id === productId);
    if (indiceObjeto !== -1) {
      const objetoActualizado = { ...products[indiceObjeto], ...updatedProduct };
      const nuevoArrayObjetos = [...products];
      nuevoArrayObjetos[indiceObjeto] = objetoActualizado;
      const body = {
        products: updatedProduct,
        token: props.token
      }
      axios.put("http://localhost:4001/admin/products", body)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
      
      return nuevoArrayObjetos;
    }
    return products;
  };

  if (!props.isAdmin) {
    history("/home")
  }

  return (
    <>
      { loaded.current &&
        <div className='admin-panel'>
          <h1>Panel de Administrador</h1>
          <ProductList
            productos={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        </div>
      }
    </>
  );
};

export default AdminPanel;
