import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import CartPage from './pages/CartPage'
import ProductDetail from './pages/ProductDetail'
import HomePage from './pages/HomePage'
import { ChevronRightIcon, FireIcon, SparklesIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { useLocalStorage } from './hooks/useLocalStorage'
import { products, categories } from './data/products'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage('cartItems', [])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const addToCart = (product) => {
    const { id, selectedColor, quantity = 1 } = product
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === id && item.selectedColor === selectedColor
      )
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity }]
    })
    
    toast.success('Ürün sepete eklendi!')
  }

  const removeFromCart = (productId, selectedColor) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === productId && item.selectedColor === selectedColor)
      )
    )
  }

  const updateQuantity = (productId, selectedColor, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, selectedColor)
      toast.info('Ürün sepetten kaldırıldı')
      return
    }

    const product = products.find(p => p.id === productId)
    if (product && newQuantity > product.specs.stock) {
      toast.warning(`Maksimum ${product.specs.stock} adet sipariş verebilirsiniz`)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
    toast.success('Sepet güncellendi')
  }

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId)
      }
      return [...prevFavorites, productId]
    })
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer position="bottom-right" />
        <Navbar cartItems={cartItems} cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} setIsCartOpen={setIsCartOpen} />
        <Cart
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetail 
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
