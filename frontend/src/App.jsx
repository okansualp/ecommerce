import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Cart from './components/Cart'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CategoryPage from './pages/CategoryPage'
import UserPage from './pages/UserPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ProductManagement from './pages/admin/ProductManagement'
import UserManagement from './pages/admin/UserManagement'
import Analytics from './pages/admin/Analytics'
import Settings from './pages/admin/Settings'
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
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }
      return [...prevItems, product]
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
          products={products}
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
              <ProductPage 
                products={products}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            } 
          />
          <Route 
            path="/category/:category" 
            element={
              <CategoryPage 
                products={products}
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
            path="/checkout" 
            element={
              <CheckoutPage 
                cartItems={cartItems}
              />
            } 
          />
          <Route 
            path="/order-success" 
            element={<OrderSuccessPage />} 
          />
          <Route 
            path="/user" 
            element={
              <UserPage 
                favorites={favorites}
                cartItems={cartItems}
              />
            } 
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route 
              path="products" 
              element={<ProductManagement products={products} />} 
            />
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
