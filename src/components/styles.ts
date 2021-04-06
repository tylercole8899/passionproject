import styled from 'styled-components';

export const Title = styled.h1`
  text-size: 1.5em,
  align-text: center
`;

export const Table = styled.table`
    width: 100%;
    height: 2em;
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