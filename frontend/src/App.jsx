import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Cart from './components/Cart'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import UserPage from './pages/UserPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { products } from './data/products'
import { useTheme } from './context/ThemeContext'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage('cartItems', [])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const { isDark } = useTheme()

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id)
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id)
      }
      return [...prevFavorites, product]
    })
  }

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
        <ToastContainer 
          position="bottom-right"
          theme={isDark ? 'dark' : 'light'}
        />
        <Navbar 
          cartItems={cartItems} 
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
          setIsCartOpen={setIsCartOpen} 
        />
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
                products={products}
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
          <Route 
            path="/user" 
            element={<UserPage />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
