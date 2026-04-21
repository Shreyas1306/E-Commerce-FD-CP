import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import adBanner from "../assets/ad-banner.jpg";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="status">Loading products...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <main className="page-wrap">
      <img src={adBanner} alt="Advertisement banner" className="hero-banner" />
      <h2 className="section-title">Amazing Products....</h2>
      <section className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={product._id || `${product.title}-${index}`} product={product} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
