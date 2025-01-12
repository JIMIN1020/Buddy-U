import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../styles/theme'
import Banner from './Banner'
import axios from 'axios'
import PropTypes from 'prop-types'

import Grade1 from '../../assets/img/Grade1.png'
import Grade2 from '../../assets/img/Grade2.png'
import Grade3 from '../../assets/img/Grade3.png'
import { useNavigate } from 'react-router-dom'

const User = ({ userData }) => {
    const navigate = useNavigate()
    const handleUserClick = async () => {
        let token = localStorage.getItem('accessToken')
        await axios
            .get(
                `http://13.124.153.160:8080/api/friends/${userData.friend_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(res => {
                const friendData = res.data.result
                switch (friendData.level) {
                    case 'SNOW_CRYSTAL':
                        friendData.level = '1'
                        break
                    case 'SNOWMAN':
                        friendData.level = '3'
                        break
                    default:
                        friendData.level = '2'
                        break
                }
                // navigate to datail page
                navigate('/buddy-detail', {
                    state: {
                        data: friendData,
                    },
                })
            })
            .catch(err => console.log(err))
    }
    return (
        <Container onClick={handleUserClick}>
            {userData?.level === '1' && <IconImg src={Grade1} />}
            {userData?.level === '2' && <IconImg src={Grade2} />}
            {userData?.level === '3' && <IconImg src={Grade3} />}
            <Banner userData={userData} />
        </Container>
    )
}

User.propTypes = {
    userData: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default User

const Container = styled.div`
    width: 111px;
    height: 111px;
    background-color: ${COLORS.darkgray};
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`

const IconImg = styled.img`
    width: 77px;
    height: 85px;
    margin-left: 23px;
    margin-top: 13px;
`
