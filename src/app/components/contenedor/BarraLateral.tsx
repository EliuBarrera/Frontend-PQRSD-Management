import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import * as SettingSelector from "../../utilities/setting/selectors";
import Scrollbar from 'smooth-scrollbar';
import { BarraInterna } from './BarraInterna';

export const BarraLateral = (props: any) => {

    /* Variables */
    const sidebarColor = useSelector(SettingSelector.sidebar_color);
    const sidebarHide: any = useSelector(SettingSelector.sidebar_show);
    const sidebarType = useSelector(SettingSelector.sidebar_type);
    const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);

    // Estado para controlar el colapso
    const [isCollapsed, setIsCollapsed] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const scrollbarInstance = useRef<any>(null);

    const minisidebar = () => {
        setIsCollapsed(!isCollapsed);
        
        // Toggle de la clase sidebar-mini
        const aside = sidebarRef.current || document.getElementsByTagName("ASIDE")[0];
        if (aside) {
            aside.classList.toggle("sidebar-mini");
        }

        // Actualizar el scrollbar después del cambio
        setTimeout(() => {
            if (scrollbarInstance.current) {
                scrollbarInstance.current.update();
            }
        }, 300);
    };

    useEffect(() => {
        // Inicializar scrollbar
        const scrollbarElement = document.querySelector("#my-scrollbar") as any;
        if (scrollbarElement && !scrollbarInstance.current) {
            scrollbarInstance.current = Scrollbar.init(scrollbarElement);
        }

        // Función para manejar el resize
        const handleResize = () => {
            const tabs = document.querySelectorAll(".nav");
            const sidebarResponsive = document.querySelector(
                '[data-sidebar="responsive"]'
            );
            
            if (window.innerWidth < 1025) {
                // Modo responsive (móvil)
                Array.from(tabs, (elem) => {
                    if (
                        !elem.classList.contains("flex-column") &&
                        (elem.classList.contains("nav-tabs") ||
                        elem.classList.contains("nav-pills"))
                    ) {
                        elem.classList.add("flex-column", "on-resize");
                    }
                    return elem;
                });
                
                if (sidebarResponsive !== null) {
                    if (!sidebarResponsive.classList.contains("sidebar-mini")) {
                        sidebarResponsive.classList.add("sidebar-mini", "on-resize");
                        setIsCollapsed(true);
                    }
                }
            } else {
                // Modo desktop
                Array.from(tabs, (elem) => {
                    if (elem.classList.contains("on-resize")) {
                        elem.classList.remove("flex-column", "on-resize");
                    }
                    return elem;
                });
                
                if (sidebarResponsive !== null) {
                    if (
                        sidebarResponsive.classList.contains("sidebar-mini") &&
                        sidebarResponsive.classList.contains("on-resize")
                    ) {
                        sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
                        setIsCollapsed(false);
                    }
                }
            }

            // Actualizar scrollbar después del resize
            if (scrollbarInstance.current) {
                scrollbarInstance.current.update();
            }
        };

        // Agregar listener de resize
        window.addEventListener("resize", handleResize);
        
        // Ejecutar una vez al montar
        handleResize();

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            if (scrollbarInstance.current) {
                scrollbarInstance.current.destroy();
            }
        };
    }, []);

    return (
        <Fragment>
            <aside
                ref={sidebarRef}
                className={`${sidebarColor} ${sidebarType.join(" ")} ${sidebarMenuStyle} ${sidebarHide.join(" ") ? 'sidebar-none' : 'sidebar'} sidebar-base`}
                data-sidebar="responsive"
            >
                <div 
                    className="sidebar-header" 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        position: 'relative',
                        minHeight: '70px'
                    }}
                >
                    <Link 
                        to="/" 
                        className="navbar-brand"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            flex: isCollapsed ? '0' : '1',
                            transition: 'all 0.3s ease',
                            opacity: isCollapsed ? '0' : '1',
                            width: isCollapsed ? '0' : 'auto',
                            overflow: 'hidden'
                        }}
                    >
                        <h4 
                            className="logo-title"
                            style={{
                                margin: 0,
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            Gestión PQRSD
                        </h4>
                    </Link>
                    <div
                        className="sidebar-toggle items-center"
                        data-toggle="sidebar"
                        data-active="true"
                        onClick={minisidebar}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            borderRadius: '8px',
                            marginLeft: isCollapsed ? 'auto' : '0',
                            marginRight: isCollapsed ? 'auto' : '0'
                        }}
                    >
                        <i className="icon" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px'
                        }}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease-in-out'
                                }}
                            >
                                <path
                                    d="M4.25 12.2744L19.25 12.2744"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </i>
                    </div>
                </div>
                <div
                    className="pt-0 sidebar-body data-scrollbar"
                    data-scroll="1"
                    id="my-scrollbar"
                >
                    {/* sidebar-list class to be added after replace css */}
                    <div className="sidebar-list navbar-collapse" id="sidebar">
                        <BarraInterna isCollapsed={isCollapsed} />
                    </div>
                </div>
                <div className="sidebar-footer"></div>
            </aside>
        </Fragment>
    )
}