import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "../../services/apiAuth";

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-[60vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border-b-2 border-b-gray-600">
        <h2 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <div>
            <button
              type="button"
              onClick={googleLogin}
              className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold leading-6 text-black border-2 shadow-sm hover:bg-[#4285F4]/90 hover:text-white hover:border-[#4285F4]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              <FcGoogle className="w-6 h-6 mr-3" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
