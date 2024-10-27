// src/components/Login.jsx

const Login = () => {
  const handleSignIn = async () => {
      window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <button
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
              Sign in with Google
          </button>
      </div>
  );
};

export default Login;
