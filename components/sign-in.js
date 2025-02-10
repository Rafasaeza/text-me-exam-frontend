import { signIn } from "@/auth"
import './loginStyles.css'; // Asegúrate de importar el archivo CSS

export default function SignIn() {
  return (
    <div className="form-container">
      <form
        action={async () => {
          "use server"
          await signIn("google", { redirectTo: "/allMessages" })
        }}
      >
        <button type="submit" className="google-button">
          Signin with Google
        </button>
      </form>
    </div>
  )
}