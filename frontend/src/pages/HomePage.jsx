import { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import adBanner from "../assets/ad-banner.jpg";
import banner2 from "../assets/banner_2.jpg";
import banner3 from "../assets/banner_3.jpg";

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
      <section className="promo-grid">

  <div
    className="promo-large"
    onClick={() =>
      window.open("https://www.amazon.in/ref=nav_logo", "_blank")
    }
  >
    <img
      src={adBanner}
      alt="Main Sale Banner"
      className="promo-img"
    />
  </div>


  <div
    className="promo-small"
    onClick={() =>
      window.open("https://www.amazon.in/dp/B0GLFVTCC7/?_encoding=UTF8&pd_rd_w=nYaF7&content-id=amzn1.sym.be09ec77-a8a2-425c-bbeb-2260260d05ad&pf_rd_p=be09ec77-a8a2-425c-bbeb-2260260d05ad&pf_rd_r=D2WJHDQGSSYM5VVWN8R4&pd_rd_wg=vl9A0&pd_rd_r=5d0bb4cc-8d1a-4c55-8090-bf1691c0e574&ref_=pd_hp_d_hero_unk&th=1", "_blank")
    }
  >
    <img
      src={banner2}
      alt="Fashion Sale Banner"
      className="promo-img"
    />
  </div>


  <div
    className="promo-small"
    onClick={() =>
      window.open("https://www.amazon.in/b/ref=ALMar22PC/?_encoding=UTF8&node=10894223031&pd_rd_w=sTYxN&content-id=amzn1.sym.7e3dcd9d-6e19-4cbf-8fd0-02014bca0c3b&pf_rd_p=7e3dcd9d-6e19-4cbf-8fd0-02014bca0c3b&pf_rd_r=D2WJHDQGSSYM5VVWN8R4&pd_rd_wg=vl9A0&pd_rd_r=5d0bb4cc-8d1a-4c55-8090-bf1691c0e574&ref_=pd_hp_d_hero_unk", "_blank")
    }
  >
    <img
      src={banner3}
      alt="Mobile Sale Banner"
      className="promo-img"
    />
  </div>

</section>

<section className="category-strip">

  <div
    className="category-item"
    onClick={() => window.open("https://www.amazon.in/s?k=mobiles", "_blank")}
  >
    Mobiles
  </div>

  <div
    className="category-item"
    onClick={() => window.open("https://www.amazon.in/s?k=home+decor", "_blank")}
  >
    Home Decor
  </div>

  <div
    className="category-item"
    onClick={() => window.open("https://www.amazon.in/s?k=laptops", "_blank")}
  >
    Laptops
  </div>

  <div
    className="category-item"
    onClick={() => window.open("https://www.amazon.in/s?k=headphones", "_blank")}
  >
    Headphones
  </div>

  <div
    className="category-item"
    onClick={() => window.open("https://www.amazon.in/s?k=smart+watches", "_blank")}
  >
    Smart Watches
  </div>

  <div
    className="category-item"
    onClick={() => window.open("https://www.amazon.in/s?k=fashion", "_blank")}
  >
    Fashion
  </div>

</section>
      <h2 className="section-title">Top Deals <span>for You</span></h2>
      <section className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={product._id || `${product.title}-${index}`} product={product} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
