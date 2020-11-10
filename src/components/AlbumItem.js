/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Link} from 'react-router-dom';
import {FaStar} from 'react-icons/fa'

import * as colors from '../styles/colors'
import * as mq from '../styles/media-queries'
import {Button, ActionLabel, Image} from './custom-lib'

const cssAlbumGrid = {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 20% 20% 200px',
    gridColumnGap: '2rem',
    background: colors.white,
    marginBottom: '16px', 
    padding: '8px 16px',
    [mq.medium]: {
        gridTemplateColumns: '1fr 20% 10% 200px',
    },
    [mq.small]: {
        gridTemplateColumns: '1fr',
        gridRowGap: '1rem',
        padding: '24px 16px',
        marginBottom: '16px',
    },
}

const cssAlbumTitle = {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '600',
    color: colors.text
}

const cssArtistName = {
    color: colors.gray200,
    letterSpacing: '-0.44px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    ':hover': {
        color: colors.gray300,
        textDecoration: 'underline',
    },
  }

function FavoriteWrapper({isFavorite, children}) {
    return (
        <div css={{position: 'relative'}}>
            {isFavorite && 
            <FaStar 
                css={{
                        color: colors.yellow,
                        position: 'absolute',
                        fontSize: '1rem',
                        right: '0',
                        top: '0',
                        transform: 'translate(50%, -50%)',
                    }}
            >
            </FaStar>
            }
            {children}
        </div>
    )
}

function AlbumItem({album, changeFavoriteStatus}) {
    const {title, imageUrl, artistId, artistName, favorite: isFavorite, releaseDate, price} = album;
    
    function handleMarkAsFavourite() {
        changeFavoriteStatus({...album, favorite: !isFavorite})
    }

    function handleUnarkAsFavourite() {
        changeFavoriteStatus({...album, favorite: !isFavorite})
    }

    return (
        <div css={cssAlbumGrid}>
            <div css={{display: 'flex'}}>
                <FavoriteWrapper isFavorite={isFavorite}>
                    <Image src={imageUrl} alt={title} width="4rem" height="4rem" radius="4px"></Image>
                </FavoriteWrapper>
                <div css={{marginLeft: '24px'}}>
                    <div css={cssAlbumTitle}>{title || '-'}</div>
                    <Link to={`/artist/${artistId}`}
                          css={cssArtistName}>
                        {artistName || '-'}
                    </Link>
                </div>
            </div>
            <div>
                <span css={{color: colors.gray200}}>Released:</span>{' '}
                <span>{releaseDate ? new Date(releaseDate).getFullYear() : '-'}</span>
            </div>
            <div>
                {price || '-'}
            </div>
            <div css={{display: 'flex', justifyContent: 'flex-end'}}>
                {isFavorite ? <ActionLabel onClick={handleUnarkAsFavourite}>Remove favorite</ActionLabel>
                            : <Button onClick={handleMarkAsFavourite}>Mark as favorite</Button>}
            </div> 
        </div>
    )
}

export default AlbumItem;
 