export const FooterInt = () => {
    return (
        <footer className="footer">
            <div className="footer-body">
                <ul className="left-panel list-inline mb-0 p-0">
                    <li className="list-inline-item"><a href="#">Politica de Privacidad</a></li>
                    <li className="list-inline-item"><a href="#">Terminos por uso</a></li>
                </ul>
                <div className="right-panel">
                    ©<script>document.write(new Date().getFullYear())</script>2025 Universidad Santo Tomás &nbsp;
                    <span className="">
                        <i className="fa fa-university"></i>
                    </span> <a href="#">Facultad Ingenieria de Sistemas</a>.
                </div>
            </div>
        </footer>
    )
}