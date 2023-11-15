import styled, {css} from "styled-components";
import {Link} from "react-router-dom"

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1 {
        font-size: 30px;
        color: #0D2636;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;

        & + li {
            margin-top: 12px;
        }

        img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0D2636;

        }

        div {
            flex: 1;
            margin-left: 12px;

            p{
                margin-top: 10px;
            }

            strong {
                display: flex;
                flex-direction: column;
                font-size: 15px;
                gap: 2px;

                a {
                    text-decoration: none;
                    color: #222;

                    &:hover{
                      color: #0071db  
                    }
                }

                div {
                    display: flex;
                    justify-content: start;
                    gap: 4px;
                    margin-top: 8px;
                    margin-left: 0px;
                }

                span {
                    background: #0071db;
                    color: #fff;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 5px 7px;
                }

                

                
            }
        }

        
    }

    
`

export const PageAction = styled.div`

        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
            outline: 0;
            border: 0;
            background: #222;
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;

            &:disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
`

export const StateFilters = styled.div`


    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 4px;

    button {
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;

        &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        }
    }
    
`