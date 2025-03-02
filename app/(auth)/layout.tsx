const AuthLayout = ({children}:{children:React.ReactNode}) => {
    return (<div>
        <div className="min-h-screen flex justify-center items-center">
            {children}
        </div>
    </div>  );
}
 
export default AuthLayout;