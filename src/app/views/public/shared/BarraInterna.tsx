import { useContext, useState } from 'react';
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ARREGLO_MENU_ADMIN } from '../../../utilities/domains/ItemsMenuAdmin';
import { ARREGLO_MENU_FUNCTIONARY } from '../../../utilities/domains/ItemsMenuFunctionary';

export const BarraInterna = (props: any) => {

    const CustomToggle = ({ children, eventKey, onClick }: any) => {
        const { activeEventKey } = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(eventKey);
        const isCurrentEventKey = activeEventKey === eventKey;

        return (
            <Link
                to="#"
                aria-expanded={isCurrentEventKey ? 'true' : 'false'}
                className="nav-link"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    decoratedOnClick(e); // solución al error
                    onClick?.({ state: !isCurrentEventKey, eventKey });
                }}
            >
                {children}
            </Link>
        );
    };

    const [activeMenu, setActiveMenu] = useState<any>(false);
    const [active, setActive] = useState<string>('');
    const location = useLocation();

    // Lógica para decidir qué menú usar
    const opcionesMenuActual =
        location.pathname.includes('admin') ? ARREGLO_MENU_ADMIN :
        location.pathname.includes('functionary') ? ARREGLO_MENU_FUNCTIONARY :
        ARREGLO_MENU_FUNCTIONARY; // valor por defecto

    return (
        <div>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item" key={0}>
                    <Link className="nav-link static-item disabled" to="#" >
                        <span className="default-icon">Páginas</span>
                    </Link>
                </li>

                {
                    opcionesMenuActual.map((opcion, indice) => (
                        !opcion.children ? (
                            <div key={indice}>
                                <li className={`${location.pathname === opcion.path ? 'active' : ''} nav-item`}>
                                    <Link className={`${location.pathname === opcion.path ? 'active' : ''} nav-link`} to={opcion.path}>
                                        <i className={opcion.icon}></i>
                                        <span className="text-start item-name">{opcion.titulo}</span>
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <div key={indice}>
                                <Accordion.Item
                                    as="li"
                                    eventKey={opcion.titulo + "_horizontal-menu"}
                                    bsPrefix={`nav-item ${active === 'menustyle' ? 'active' : ''}`}
                                    onClick={() => setActive('menustyle')}
                                >
                                    <CustomToggle
                                        eventKey={opcion.titulo + "_horizontal-menu"}
                                        onClick={(activeKey: any) => setActiveMenu(activeKey)}
                                    >
                                        <i className={opcion.icon}></i>
                                        <span className="item-name text-start">{opcion.titulo}</span>
                                        <i className="right-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </i>
                                    </CustomToggle>
                                    <Accordion.Collapse eventKey={opcion.titulo + "_horizontal-menu"}>
                                        <ul className="sub-nav">
                                            {
                                                opcion.children.map((subOpcion: any, subIndice: number) => (
                                                    <li className="nav-item" key={subIndice}>
                                                        <Link className={`${location.pathname === subOpcion.path ? 'active' : ''} nav-link`} to={subOpcion.path}>
                                                            <i className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                                                    <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                                </svg>
                                                            </i>
                                                            <i className="sidenav-mini-icon">{subOpcion.Acronimo}</i>
                                                            <span className="item-name text-start">{subOpcion.titulo}</span>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </Accordion.Item>
                            </div>
                        )
                    ))
                }
            </Accordion>
        </div>
    );
};
