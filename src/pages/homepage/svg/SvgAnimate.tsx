import React, { useEffect } from 'react';
import './index.less';
/*@ts-ignore*/
import { history } from 'umi';

const SvgAnimate = (props: any) => {
  /*useEffect(()=>{

    const logo = document.querySelectorAll('#logo path');

    for(let i=0;i<logo.length;++i){
      // @ts-ignore
      console.log(`第${i}个字符长度为: ${logo[i].getTotalLength()}`)
    }
  }, [])*/

  return (
    <React.Fragment>
      <svg
        id="logo"
        width="336"
        height="83"
        viewBox="0 0 336 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 64.2195V1H36.1661V7.79116H8.05599V29.1524H34.3452V35.9436H8.05599V57.4284H36.6214V64.2195H1Z"
          stroke="black"
        />
        <path
          d="M54.6881 35.6966V64.2195H47.9735V16.8049H54.4605V24.2134H55.0295C56.0538 21.8056 57.6091 19.8712 59.6956 18.4101C61.782 16.9284 64.4754 16.1875 67.7758 16.1875C70.7348 16.1875 73.3239 16.846 75.5431 18.1631C77.7623 19.4596 79.4884 21.4352 80.7213 24.0899C81.9542 26.7241 82.5706 30.0579 82.5706 34.0915V64.2195H75.8561V34.5854C75.8561 30.8605 74.9646 27.9588 73.1816 25.8803C71.3986 23.7812 68.9518 22.7317 65.8411 22.7317C63.6978 22.7317 61.782 23.2359 60.0939 24.2443C58.4247 25.2527 57.1065 26.7241 56.1391 28.6585C55.1718 30.593 54.6881 32.939 54.6881 35.6966Z"
          stroke="black"
        />
        <path
          d="M129.011 16.8049L112.85 64.2195H106.022L89.8613 16.8049H97.1449L109.208 54.5884H109.664L121.727 16.8049H129.011Z"
          stroke="black"
        />
        <path
          d="M154.631 65.2073C150.421 65.2073 146.788 64.1989 143.734 62.1822C140.7 60.1448 138.357 57.3049 136.707 53.6623C135.076 49.9992 134.26 45.7393 134.26 40.8826C134.26 36.0259 135.076 31.7454 136.707 28.0412C138.357 24.3163 140.652 21.4146 143.592 19.3361C146.551 17.237 150.003 16.1875 153.948 16.1875C156.225 16.1875 158.472 16.5991 160.692 17.4223C162.911 18.2454 164.931 19.5831 166.752 21.4352C168.573 23.2668 170.024 25.6951 171.105 28.7203C172.186 31.7454 172.727 35.4703 172.727 39.8948V42.9817H139.04V36.6844H165.898C165.898 34.0091 165.405 31.6219 164.419 29.5229C163.451 27.4238 162.067 25.7671 160.265 24.553C158.482 23.3388 156.376 22.7317 153.948 22.7317C151.274 22.7317 148.96 23.452 147.006 24.8925C145.072 26.3125 143.583 28.1646 142.539 30.4489C141.496 32.7332 140.975 35.1822 140.975 37.7957V41.9939C140.975 45.5747 141.544 48.6101 142.682 51.1002C143.839 53.5697 145.441 55.4527 147.49 56.7492C149.539 58.0252 151.919 58.6631 154.631 58.6631C156.395 58.6631 157.989 58.3956 159.411 57.8605C160.853 57.3049 162.095 56.4817 163.138 55.391C164.182 54.2797 164.988 52.9009 165.557 51.2546L172.044 53.2302C171.361 55.6174 170.213 57.7165 168.601 59.5274C166.989 61.3178 164.997 62.7172 162.626 63.7256C160.255 64.7134 157.59 65.2073 154.631 65.2073Z"
          stroke="black"
        />
        <path d="M189.655 1V64.2195H182.941V1H189.655Z" stroke="black" />
        <path
          d="M219.707 65.2073C215.762 65.2073 212.3 64.1886 209.322 62.1513C206.363 60.1139 204.049 57.2637 202.38 53.6006C200.73 49.9375 199.905 45.657 199.905 40.7591C199.905 35.8201 200.73 31.5088 202.38 27.8251C204.049 24.1414 206.363 21.2809 209.322 19.2435C212.3 17.2062 215.762 16.1875 219.707 16.1875C223.652 16.1875 227.105 17.2062 230.064 19.2435C233.041 21.2809 235.356 24.1414 237.006 27.8251C238.675 31.5088 239.509 35.8201 239.509 40.7591C239.509 45.657 238.675 49.9375 237.006 53.6006C235.356 57.2637 233.041 60.1139 230.064 62.1513C227.105 64.1886 223.652 65.2073 219.707 65.2073ZM219.707 58.6631C222.704 58.6631 225.17 57.8296 227.105 56.1627C229.039 54.4958 230.471 52.3041 231.401 49.5876C232.33 46.8712 232.795 43.9283 232.795 40.7591C232.795 37.5899 232.33 34.6368 231.401 31.8998C230.471 29.1627 229.039 26.9505 227.105 25.263C225.17 23.5755 222.704 22.7317 219.707 22.7317C216.71 22.7317 214.244 23.5755 212.31 25.263C210.375 26.9505 208.943 29.1627 208.014 31.8998C207.084 34.6368 206.619 37.5899 206.619 40.7591C206.619 43.9283 207.084 46.8712 208.014 49.5876C208.943 52.3041 210.375 54.4958 212.31 56.1627C214.244 57.8296 216.71 58.6631 219.707 58.6631Z"
          stroke="black"
        />
        <path
          d="M249.759 82V16.8049H256.246V24.3369H257.043C257.536 23.5137 258.219 22.4642 259.091 21.1883C259.983 19.8918 261.254 18.7393 262.904 17.7309C264.573 16.702 266.83 16.1875 269.675 16.1875C273.355 16.1875 276.598 17.1856 279.406 19.1818C282.213 21.178 284.404 24.0076 285.978 27.6707C287.552 31.3338 288.339 35.6555 288.339 40.6357C288.339 45.657 287.552 50.0095 285.978 53.6932C284.404 57.3563 282.222 60.1963 279.434 62.213C276.646 64.2092 273.431 65.2073 269.789 65.2073C266.982 65.2073 264.734 64.7031 263.046 63.6947C261.358 62.6658 260.059 61.503 259.148 60.2066C258.238 58.8895 257.536 57.7988 257.043 56.9345H256.474V82H249.759ZM256.36 40.5122C256.36 44.093 256.844 47.2519 257.811 49.9889C258.778 52.7054 260.191 54.8354 262.05 56.3788C263.909 57.9017 266.185 58.6631 268.879 58.6631C271.686 58.6631 274.028 57.8605 275.906 56.2553C277.803 54.6296 279.225 52.4482 280.174 49.7111C281.141 46.9535 281.625 43.8872 281.625 40.5122C281.625 37.1784 281.151 34.1738 280.202 31.4985C279.273 28.8026 277.86 26.6726 275.963 25.1086C274.085 23.524 271.724 22.7317 268.879 22.7317C266.147 22.7317 263.852 23.4828 261.993 24.9851C260.134 26.4668 258.731 28.5454 257.782 31.2207C256.834 33.8754 256.36 36.9726 256.36 40.5122Z"
          stroke="black"
        />
        <path
          d="M316.905 65.2073C312.694 65.2073 309.062 64.1989 306.008 62.1822C302.973 60.1448 300.631 57.3049 298.98 53.6623C297.349 49.9992 296.533 45.7393 296.533 40.8826C296.533 36.0259 297.349 31.7454 298.98 28.0412C300.631 24.3163 302.926 21.4146 305.866 19.3361C308.825 17.237 312.277 16.1875 316.222 16.1875C318.498 16.1875 320.746 16.5991 322.965 17.4223C325.184 18.2454 327.204 19.5831 329.025 21.4352C330.846 23.2668 332.297 25.6951 333.378 28.7203C334.459 31.7454 335 35.4703 335 39.8948V42.9817H301.313V36.6844H328.172C328.172 34.0091 327.678 31.6219 326.692 29.5229C325.725 27.4238 324.34 25.7671 322.538 24.553C320.755 23.3388 318.65 22.7317 316.222 22.7317C313.548 22.7317 311.233 23.452 309.28 24.8925C307.345 26.3125 305.856 28.1646 304.813 30.4489C303.77 32.7332 303.248 35.1822 303.248 37.7957V41.9939C303.248 45.5747 303.817 48.6101 304.955 51.1002C306.112 53.5697 307.715 55.4527 309.763 56.7492C311.812 58.0252 314.192 58.6631 316.905 58.6631C318.669 58.6631 320.262 58.3956 321.685 57.8605C323.126 57.3049 324.369 56.4817 325.412 55.391C326.455 54.2797 327.261 52.9009 327.83 51.2546L334.317 53.2302C333.634 55.6174 332.487 57.7165 330.875 59.5274C329.262 61.3178 327.271 62.7172 324.9 63.7256C322.529 64.7134 319.864 65.2073 316.905 65.2073Z"
          stroke="black"
        />
      </svg>

      <svg
        id="platform"
        width="267"
        height="55"
        viewBox="0 0 267 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.164773 54V3.09091H17.3665C21.3603 3.09091 24.625 3.81179 27.1605 5.25355C29.7126 6.67874 31.6018 8.60938 32.8281 11.0455C34.0545 13.4815 34.6676 16.1993 34.6676 19.1989C34.6676 22.1984 34.0545 24.9245 32.8281 27.3771C31.6184 29.8298 29.7457 31.7853 27.2102 33.2436C24.6747 34.6854 21.4266 35.4062 17.4659 35.4062H5.13636V29.9375H17.267C20.0014 29.9375 22.1972 29.4652 23.8544 28.5206C25.5116 27.576 26.7131 26.3 27.4588 24.6925C28.2211 23.0684 28.6023 21.2372 28.6023 19.1989C28.6023 17.1605 28.2211 15.3376 27.4588 13.7301C26.7131 12.1226 25.5033 10.8632 23.8295 9.9517C22.1558 9.02367 19.9351 8.55966 17.1676 8.55966H6.32955V54H0.164773ZM49.6694 3.09091V54H43.8029V3.09091H49.6694ZM71.65 54.8949C69.2305 54.8949 67.0347 54.4392 65.0627 53.5277C63.0906 52.5997 61.5246 51.2656 60.3645 49.5256C59.2045 47.7689 58.6245 45.6477 58.6245 43.1619C58.6245 40.9744 59.0553 39.2012 59.9171 37.8423C60.7788 36.4669 61.9306 35.3897 63.3723 34.6108C64.8141 33.8319 66.405 33.2519 68.1451 32.8707C69.9017 32.473 71.6666 32.1581 73.4398 31.9261C75.7599 31.6278 77.6408 31.4041 79.0826 31.255C80.5409 31.0893 81.6015 30.8158 82.2644 30.4347C82.9438 30.0535 83.2836 29.3906 83.2836 28.446V28.2472C83.2836 25.7945 82.6124 23.8887 81.2701 22.5298C79.9443 21.1709 77.9308 20.4915 75.2296 20.4915C72.4289 20.4915 70.2331 21.1046 68.6422 22.331C67.0513 23.5573 65.9327 24.8665 65.2864 26.2585L59.7182 24.2699C60.7125 21.9498 62.0383 20.1435 63.6955 18.8509C65.3693 17.5417 67.1922 16.6302 69.1642 16.1165C71.1529 15.5862 73.1084 15.321 75.0307 15.321C76.257 15.321 77.6657 15.4702 79.2566 15.7685C80.8641 16.0502 82.4135 16.6385 83.905 17.5334C85.4131 18.4283 86.6642 19.7789 87.6586 21.5852C88.6529 23.3916 89.15 25.8111 89.15 28.8438V54H83.2836V48.8295H82.9853C82.5875 49.6581 81.9247 50.5447 80.9966 51.4893C80.0686 52.4339 78.834 53.2377 77.2928 53.9006C75.7516 54.5634 73.8707 54.8949 71.65 54.8949ZM72.5449 49.625C74.865 49.625 76.8205 49.1693 78.4114 48.2578C80.0189 47.3464 81.2286 46.1697 82.0407 44.728C82.8693 43.2862 83.2836 41.7699 83.2836 40.179V34.8097C83.035 35.108 82.4881 35.3814 81.6429 35.63C80.8143 35.862 79.8532 36.0691 78.7594 36.2514C77.6822 36.4171 76.6299 36.5663 75.6025 36.6989C74.5916 36.8149 73.7712 36.9143 73.1415 36.9972C71.6169 37.196 70.1917 37.5192 68.8659 37.9666C67.5568 38.3975 66.4962 39.0521 65.6841 39.9304C64.8887 40.7921 64.4909 41.9687 64.4909 43.4602C64.4909 45.4986 65.245 47.0398 66.753 48.0838C68.2776 49.1113 70.2083 49.625 72.5449 49.625ZM116.463 15.8182V20.7898H96.6758V15.8182H116.463ZM102.443 6.67045H108.309V43.0625C108.309 44.7197 108.55 45.9626 109.03 46.7912C109.527 47.6032 110.157 48.1501 110.919 48.4318C111.698 48.697 112.519 48.8295 113.38 48.8295C114.027 48.8295 114.557 48.7964 114.971 48.7301C115.386 48.6473 115.717 48.581 115.966 48.5312L117.159 53.8011C116.761 53.9503 116.206 54.0994 115.493 54.2486C114.781 54.4143 113.877 54.4972 112.784 54.4972C111.127 54.4972 109.502 54.1409 107.912 53.4283C106.337 52.7157 105.028 51.6302 103.984 50.1719C102.957 48.7135 102.443 46.8741 102.443 44.6534V6.67045ZM142.29 15.8182V20.7898H121.708V15.8182H142.29ZM127.873 54V10.5483C127.873 8.36079 128.386 6.53788 129.414 5.07954C130.441 3.62121 131.775 2.52746 133.416 1.79829C135.056 1.06913 136.788 0.704542 138.611 0.704542C140.053 0.704542 141.23 0.820547 142.141 1.05256C143.052 1.28456 143.732 1.5 144.179 1.69886L142.489 6.76988C142.191 6.67045 141.776 6.54616 141.246 6.39702C140.732 6.24787 140.053 6.17329 139.208 6.17329C137.269 6.17329 135.868 6.66217 135.007 7.63991C134.162 8.61766 133.739 10.0511 133.739 11.9403V54H127.873ZM164.451 54.7955C161.004 54.7955 157.98 53.9751 155.378 52.3345C152.793 50.6939 150.771 48.3987 149.312 45.4489C147.871 42.4991 147.15 39.0521 147.15 35.108C147.15 31.1307 147.871 27.6589 149.312 24.6925C150.771 21.7261 152.793 19.4226 155.378 17.782C157.98 16.1413 161.004 15.321 164.451 15.321C167.898 15.321 170.914 16.1413 173.499 17.782C176.101 19.4226 178.123 21.7261 179.565 24.6925C181.023 27.6589 181.752 31.1307 181.752 35.108C181.752 39.0521 181.023 42.4991 179.565 45.4489C178.123 48.3987 176.101 50.6939 173.499 52.3345C170.914 53.9751 167.898 54.7955 164.451 54.7955ZM164.451 49.5256C167.069 49.5256 169.224 48.8544 170.914 47.5121C172.604 46.1697 173.856 44.4048 174.668 42.2173C175.48 40.0298 175.886 37.66 175.886 35.108C175.886 32.5559 175.48 30.1778 174.668 27.9737C173.856 25.7696 172.604 23.9882 170.914 22.6293C169.224 21.2704 167.069 20.5909 164.451 20.5909C161.833 20.5909 159.678 21.2704 157.988 22.6293C156.298 23.9882 155.046 25.7696 154.234 27.9737C153.422 30.1778 153.016 32.5559 153.016 35.108C153.016 37.66 153.422 40.0298 154.234 42.2173C155.046 44.4048 156.298 46.1697 157.988 47.5121C159.678 48.8544 161.833 49.5256 164.451 49.5256ZM190.707 54V15.8182H196.375V21.5852H196.773C197.469 19.696 198.728 18.1631 200.551 16.9865C202.374 15.8099 204.429 15.2216 206.716 15.2216C207.147 15.2216 207.685 15.2299 208.331 15.2464C208.978 15.263 209.467 15.2879 209.798 15.321V21.2869C209.599 21.2372 209.144 21.1626 208.431 21.0632C207.735 20.9472 206.997 20.8892 206.219 20.8892C204.363 20.8892 202.705 21.2786 201.247 22.0575C199.805 22.8198 198.662 23.8804 197.817 25.2393C196.988 26.5817 196.574 28.1146 196.574 29.8381V54H190.707ZM216.752 54V15.8182H222.42V21.7841H222.917C223.712 19.7457 224.997 18.1631 226.77 17.0362C228.543 15.8928 230.673 15.321 233.158 15.321C235.677 15.321 237.774 15.8928 239.447 17.0362C241.138 18.1631 242.455 19.7457 243.4 21.7841H243.798C244.775 19.812 246.242 18.246 248.197 17.0859C250.153 15.9093 252.498 15.321 255.232 15.321C258.646 15.321 261.438 16.3899 263.609 18.5277C265.78 20.6489 266.866 23.955 266.866 28.446V54H260.999V28.446C260.999 25.6288 260.229 23.6153 258.688 22.4055C257.146 21.1958 255.332 20.5909 253.244 20.5909C250.559 20.5909 248.479 21.4029 247.004 23.027C245.529 24.6345 244.792 26.6728 244.792 29.142V54H238.826V27.8494C238.826 25.6785 238.122 23.9302 236.713 22.6044C235.304 21.2621 233.49 20.5909 231.269 20.5909C229.745 20.5909 228.319 20.9969 226.994 21.8089C225.684 22.621 224.624 23.7479 223.812 25.1896C223.016 26.6148 222.619 28.2637 222.619 30.1364V54H216.752Z"
          fill="black"
        />
      </svg>
    </React.Fragment>
  );
};

export default SvgAnimate;
