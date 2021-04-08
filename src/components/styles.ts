import styled from 'styled-components';

export const Title = styled.h1`
  text-size: 1.5em,
  align-text: center
`;

export const Table = styled.table`
    width: 80%;
    height: 2em;
    margin: 0 auto;
    margin-bottom: 5%;
    border: solid 1px black;
    border-radius: 20px;
    overflow: hidden;
`;

export const Row = styled.tr`
    height: 30px;
    background: white;
    &:nth-child(even) {
        background: #dedede
    }
    font-size: 15px;
    &:first-child {
        font-size: 20px;
        height: 40px;
    }
    &:last-child {
        height: 40px;
    }
`;

export const Filter = styled.a`
    font-weight: bold;
    font-size: 18px;
    text-decoration: underline;
    &:hover {
        color: blue;
        cursor: pointer;
    }
`;

export const CoinName = styled.a`
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const ChangeArrow = styled.span`
    color: ${props => props.color || "red"};
`;

export const CoinHeader = styled.div`
    display: flex;
    width: 80%;
    height: 75px;
    margin: 0 auto;
    align-items: center;
    border-radius: 10px;
    border: solid 1px grey;
`;

export const CoinHeaderItem = styled.div`
    width: fit-content;
    text-align: left;
    padding: 25px;
`;