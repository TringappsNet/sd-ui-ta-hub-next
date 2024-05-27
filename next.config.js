/** @type {import('next').NextConfig} */


export default {
    webpack: (config, {isServer}) => {
        if(isServer) {
            //modify
        } else {
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      publicPath: '/_next/images',
                      outputPath: 'public/images',
                      name: '[name]-[hash].[ext]',
                    },
                  },
                ],
              });
        }
        return config;
    }
};

  
