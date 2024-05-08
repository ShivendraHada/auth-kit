type EnvVariables = {
  MONGODB_URI: string;
  NEXTAUTH_SECRET: string;
  EMAIL_HOST: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
};

let envs: EnvVariables | null = null;

const getEnv = (): EnvVariables => {
  if (envs) {
    return envs;
  }

  envs = {
    MONGODB_URI: process.env.MONGODB_URI || "",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
    EMAIL_HOST: process.env.EMAIL_HOST || "",
    EMAIL_USERNAME: process.env.EMAIL_USERNAME || "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  };

  const emptyKeys = isAnyKeyEmpty(envs);
  if (emptyKeys.length > 0) {
    throw new Error(`Environment Key Missing: ${emptyKeys.join(", ")}`);
  }

  return envs;
};

const isAnyKeyEmpty = (config: EnvVariables): string[] => {
  const emptyKeys = Object.keys(config).filter((key) => {
    const value = config[key as keyof EnvVariables];
    return value === "" || value === undefined;
  });
  return emptyKeys;
};

export default getEnv;
