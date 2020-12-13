import numpy as np
import matplotlib.pyplot as plt

X = np.linspace(-np.pi, np.pi, 10, endpoint=True)
C,S = np.cos(X), np.sin(X)

print(X)

plt.plot(X,C)
plt.plot(X,S)

plt.show()
