import Link from 'next/link';

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8" style={{ backgroundColor: '#f3f4f6' }}>
      <h1 className="text-3xl font-bold mb-8 text-black" style={{ color: '#000000' }}>Test Pages</h1>
      <ul className="space-y-4">
        <li style={{ color: '#000000' }}>
          <Link 
            href="/page" 
            className="text-blue-600 underline font-medium hover:text-blue-800"
            style={{ color: '#2563eb' }}
          >
            Basic Page
          </Link>
        </li>
        <li style={{ color: '#000000' }}>
          <Link 
            href="/with-store-page" 
            className="text-blue-600 underline font-medium hover:text-blue-800"
            style={{ color: '#2563eb' }}
          >
            Page with Store
          </Link>
        </li>
      </ul>
    </div>
  );
} 