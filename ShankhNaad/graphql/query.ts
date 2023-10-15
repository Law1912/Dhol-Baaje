import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query FindUSER{
    userFindAll {
            id
            subjectId
            username
            wallet {
                id
                subjectId
                name
                walletId
                address
                publicKey
                balance
                assets {
                        id
                    subjectId
                    name
                    fingerprint
                    policyId
                    quantity
                    metadata
                    assetSubjectId
                    logosphereId
                    createdAt
                    updatedAt
                }
                createdAt
                updatedAt
            }
            myTracksId
            likedTracksId
            historyTracksId
            subscriptionEndDate
            rewards
            likes
            createdAt
            updatedAt
    }
    }
`;

export const GET_USER = gql`
    query FindUSER ($username: String!) {
        userFindOneByUsername (username: $username) {
            id
            subjectId
            username
            wallet {
                id
                subjectId
                name
                walletId
                address
                publicKey
                balance
                assets {
                        id
                    subjectId
                    name
                    fingerprint
                    policyId
                    quantity
                    metadata
                    assetSubjectId
                    logosphereId
                    createdAt
                    updatedAt
                }
                createdAt
                updatedAt
            }
            myTracksId
            likedTracksId
            historyTracksId
            subscriptionEndDate
            rewards
            likes
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_SONGS = gql`
    query GetAllSongs {
        trackFindAll{
            id
            subjectId
            title
            subtitle
            username
            music
            image
            likes
            n_listens
            lyrics
            album
            value
            nftIpfsCid
            nftCardanoTxId
            nftName
            nftDescription
            nftAssetName
            createdAt
            updatedAt
        }
    }
`;

export const GET_TRANSFER_CBOR = gql`
query getTransferCbor ($transfer: TransferDto!) {
    transferCbor (transfer: $transfer)
}
`;

export const GET_MINTING_NFT_CBOR = gql`
query getMintingNftCbor ($nft: NftDto!) {
    mintingNftCbor (nft: $nft)
}
`;


export const GET_SONGS_BY_IDS = gql`
    query GetSongsById ($idList: [ID]!) {
        trackFindManyById (idList: $idList) {
            id
            subjectId
            title
            subtitle
            username
            music
            image
            likes
            n_listens
            lyrics
            album
            value
            nftIpfsCid
            nftCardanoTxId
            nftName
            nftDescription
            nftAssetName
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_WALLETS = gql`
    query GetAllWallet{
        walletFindAll{
            id
            subjectId
            name
            walletId
            address
            publicKey
            balance
            assets {
                id
                subjectId
                name
                fingerprint
                policyId
                quantity
                metadata
                assetSubjectId
                logosphereId
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;